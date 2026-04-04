<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';

	const modules = import.meta.glob('/src/routes/**/+page.svelte');

	function extractFirstPart(str: string): [number | string, string] {
		const firstPart = str.split('.')[0];
		const num = parseInt(firstPart, 10);
		return isNaN(num) ? [firstPart, str] : [num, str];
	}

	function smartSort(a: string, b: string): number {
		const [firstA, restA] = extractFirstPart(a);
		const [firstB, restB] = extractFirstPart(b);

		// Comparar primeras partes
		if (typeof firstA === 'number' && typeof firstB === 'number') {
			if (firstA !== firstB) return firstA - firstB;
		} else if (typeof firstA === 'string' && typeof firstB === 'string') {
			const cmp = firstA.localeCompare(firstB);
			if (cmp !== 0) return cmp;
		} else {
			return typeof firstA === 'number' ? -1 : 1;
		}

		// Si primeras partes son iguales, comparar alfabéticamente el resto
		return restA.localeCompare(restB);
	}

	function buildSections() {
		const map: Record<string, { path: string; label: string }[]> = {};

		for (const filePath of Object.keys(modules)) {
			// /src/routes/svelte/reactivity/+page.svelte → /svelte/reactivity
			const route = filePath.replace('/src/routes', '').replace('/+page.svelte', '') || '/';

			const parts = route.split('/').filter(Boolean); // ['svelte', 'reactivity']
			if (parts.length < 2) continue; // skip root and top-level routes without section

			const sectionKey = parts[0]; // 'svelte' or 'sveltekit'
			const label = parts[parts.length - 1]
				.replace(/-/g, ' ')
				.replace(/\b\w/g, (c) => c.toUpperCase());

			if (!map[sectionKey]) map[sectionKey] = [];
			map[sectionKey].push({ path: route, label });
		}

		return Object.entries(map)
			.map(([key, routes]) => ({
				title: key.charAt(0).toUpperCase() + key.slice(1),
				routes: routes.sort((a, b) => smartSort(a.label, b.label))
			}))
			.sort((a, b) => smartSort(a.title, b.title));
	}

	const sections = buildSections();

	let open = $state(false);
	let search = $state('');
	let collapsedSections = $state<Record<string, boolean>>({});

	let filtered = $derived(
		sections
			.map((section) => ({
				...section,
				routes: section.routes.filter((r) =>
					r.label.toLowerCase().includes(search.toLowerCase())
				)
			}))
			.filter((section) => section.routes.length > 0)
	);

	$effect(() => {
		// Cuando search cambia, actualizar collapsedSections
		if (search.trim()) {
			// Si hay búsqueda y hay resultados, expandir todas las secciones
			const newCollapsed: Record<string, boolean> = {};
			sections.forEach((section) => {
				newCollapsed[section.title] = false;
			});
			collapsedSections = newCollapsed;
		} else {
			// Si no hay búsqueda, cerrar todas
			const newCollapsed: Record<string, boolean> = {};
			sections.forEach((section) => {
				newCollapsed[section.title] = true;
			});
			collapsedSections = newCollapsed;
		}
	});

	function toggle() {
		open = !open;
		if (!open) search = '';
	}

	function close() {
		open = false;
		search = '';
	}

	function toggleSection(title: string) {
		collapsedSections[title] = !collapsedSections[title];
	}
</script>

<header>
	<nav>
		<a href={resolve('/' as Pathname)} class="logo">SvelteKit Learn</a>
		<button class="menu-btn" onclick={toggle} aria-label="Abrir menú de rutas">
			{#if open}✕{:else}☰{/if}
		</button>
	</nav>
</header>

{#if open}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overlay" onclick={close} onkeydown={(e) => e.key === 'Escape' && close()}>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="popup" onclick={(e) => e.stopPropagation()} onkeydown={() => {}}>
			<div class="popup-header">
<!-- svelte-ignore a11y_autofocus -->
				<input
					type="text"
					placeholder="Buscar ruta..."
					bind:value={search}
					autofocus
				/>
				<button class="close-btn" onclick={close} aria-label="Cerrar">✕</button>
			</div>

			<div class="popup-body">
				{#each filtered as section (section.title)}
					<section>
						<h2 
							role="button" 
							tabindex="0"
							onclick={() => toggleSection(section.title)}
							onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleSection(section.title)}
							class:collapsed={collapsedSections[section.title]}
						>
							<span class="chevron">{collapsedSections[section.title] ? '▶' : '▼'}</span>
							{section.title}
						</h2>
						{#if !collapsedSections[section.title]}
							<ul>
								{#each section.routes as route (route.path)}
									<li>
										<a
											href={resolve(route.path as Pathname)}
											class:active={page.url.pathname === route.path}
											onclick={close}
										>
											{route.label}
										</a>
									</li>
								{/each}
							</ul>
						{/if}
					</section>
				{/each}

				{#if filtered.length === 0}
					<p class="no-results">Sin resultados</p>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	header {
		background: #1a1a2e;
		padding: 0.75rem 1.5rem;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 960px;
		margin: 0 auto;
	}

	.logo {
		color: #fff;
		text-decoration: none;
		font-weight: 700;
		font-size: 1.1rem;
	}

	.menu-btn {
		background: none;
		border: 1px solid #444;
		color: #eee;
		font-size: 1.4rem;
		padding: 0.3rem 0.6rem;
		border-radius: 4px;
		cursor: pointer;
	}

	.menu-btn:hover {
		background: #16213e;
	}

	/* Overlay fullscreen */
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.popup {
		background: #1a1a2e;
		border-radius: 8px;
		width: 100%;
		max-width: 600px;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.popup-header {
		display: flex;
		gap: 0.5rem;
		padding: 1rem;
		border-bottom: 1px solid #2a2a4a;
	}

	.popup-header input {
		flex: 1;
		padding: 0.5rem 0.75rem;
		border: 1px solid #444;
		border-radius: 4px;
		background: #16213e;
		color: #eee;
		font-size: 1rem;
	}

	.close-btn {
		background: none;
		border: 1px solid #444;
		color: #eee;
		font-size: 1.2rem;
		padding: 0.3rem 0.6rem;
		border-radius: 4px;
		cursor: pointer;
	}

	.close-btn:hover {
		background: #0f3460;
	}

	.popup-body {
		padding: 1rem;
		overflow-y: auto;
	}

	section {
		margin-bottom: 1.5rem;
	}

	section:last-child {
		margin-bottom: 0;
	}

	h2 {
		color: #ff6b6b;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 0.5rem;
		padding-bottom: 0.25rem;
		padding: 0.5rem;
		border-bottom: 1px solid #2a2a4a;
		cursor: pointer;
		user-select: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 4px;
		transition: background 0.2s;
	}

	h2:hover {
		background: #2a2a4a;
	}

	h2:focus {
		outline: 1px solid #ff6b6b;
	}

	.chevron {
		display: inline-block;
		font-size: 0.7rem;
		transition: transform 0.2s;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.25rem;
	}

	a {
		color: #a8b2d1;
		text-decoration: none;
		padding: 0.5rem 0.75rem;
		border-radius: 4px;
		display: block;
	}

	a:hover {
		color: #fff;
		background: #16213e;
	}

	.active {
		color: #fff;
		background: #0f3460;
	}

	.no-results {
		color: #666;
		text-align: center;
		padding: 2rem;
	}

	/* Responsive: 1 columna en móvil */
	@media (max-width: 480px) {
		ul {
			grid-template-columns: 1fr;
		}

		.popup {
			max-height: 100vh;
			border-radius: 0;
			height: 100%;
		}

		.overlay {
			padding: 0;
		}
	}
</style>

<script lang="ts">
	// ─── SUPERFORMS ───────────────────────────────────────────────────────────────
	// IMPORTANT: `superForm` wraps the server-validated form object and provides
	// reactive stores: `form` (values), `errors` (field errors), `message` (server
	// message), `enhance` (progressive-enhancement action for the <form> element).
	import { superForm } from 'sveltekit-superforms';

	// IMPORTANT: `untrack` from Svelte tells the compiler "I intentionally want only
	// the initial value here" — required when calling superForm(data.form) at the
	// top level of a Svelte 5 runes component to silence state_referenced_locally.
	// Without untrack(), Svelte 5 warns that `data.form` only captures the initial
	// value — which is exactly what we want here.
	import { untrack } from 'svelte';

	// ─── BITS-UI CALENDAR ────────────────────────────────────────────────────────
	// IMPORTANT: bits-ui ships an unstyled, accessible Calendar built on top of
	// @internationalized/date. We style it manually with Tailwind classes to
	// replicate the shadcn/ui look without running any CLI generator.
	import { Calendar } from 'bits-ui';

	// IMPORTANT: `today(getLocalTimeZone())` returns a timezone-aware CalendarDate.
	import { today, getLocalTimeZone } from '@internationalized/date';
	import type { DateValue } from '@internationalized/date';

	// ─── DRAG & DROP ─────────────────────────────────────────────────────────────
	// IMPORTANT: svelte-dnd-action provides the `dndzone` action and `DndEvent`
	// typing. Each list item must have a unique `id` property.
	import { dndzone } from 'svelte-dnd-action';
	import type { DndEvent } from 'svelte-dnd-action';

	let { data } = $props();

	// ═══════════════════════════════════════════════════════════════════════════════
	// SECTION 1 — SHADCN-STYLE CALENDAR WITH hh:mm:ss
	// ═══════════════════════════════════════════════════════════════════════════════

	// IMPORTANT: `value` holds the currently selected date (or undefined).
	// With bits-ui v2 in Svelte 5, using explicit `onValueChange` is more robust
	// than two-way binding for discriminated unions.
	// Type is DateValue (from @internationalized/date) because bits-ui v2 uses
	// the union type DateValue (= CalendarDate | CalendarDateTime | ZonedDateTime).
	let value = $state<DateValue | undefined>(today(getLocalTimeZone()));

	// IMPORTANT: Time is stored separately because CalendarDate only contains date
	// information. We merge them on display to show a full datetime to the user.
	let hours = $state(new Date().getHours().toString().padStart(2, '0'));
	let minutes = $state(new Date().getMinutes().toString().padStart(2, '0'));
	let seconds = $state(new Date().getSeconds().toString().padStart(2, '0'));

	// Live clock — updates every second so the time input stays current by default.
	$effect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			seconds = now.getSeconds().toString().padStart(2, '0');
		}, 1000);
		return () => clearInterval(interval);
	});

	// Helper: build a human-readable datetime string from the selected date + time inputs.
	const selectedDatetime = $derived(
		value
			? `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')} ${hours}:${minutes}:${seconds}`
			: 'Ninguna fecha seleccionada'
	);

	// ═══════════════════════════════════════════════════════════════════════════════
	// SECTION 2 — DRAG & DROP (svelte-dnd-action)
	// ═══════════════════════════════════════════════════════════════════════════════

	// IMPORTANT: Items MUST have a unique `id` field — svelte-dnd-action uses it
	// internally to track each element during drag operations.
	type DndItem = { id: number; label: string; color: string };

	let todoItems = $state<DndItem[]>([
		{ id: 1, label: '📦 Aprender Svelte 5', color: 'bg-violet-100 border-violet-300' },
		{ id: 2, label: '🎯 Dominar SvelteKit', color: 'bg-blue-100 border-blue-300' },
		{ id: 3, label: '🧩 Integrar Superforms', color: 'bg-emerald-100 border-emerald-300' }
	]);

	let doneItems = $state<DndItem[]>([
		{ id: 4, label: '✅ Instalar Tailwind CSS', color: 'bg-amber-100 border-amber-300' },
		{ id: 5, label: '✅ Configurar bits-ui', color: 'bg-rose-100 border-rose-300' }
	]);

	// IMPORTANT: `consider` fires continuously while dragging (hover feedback).
	// `finalize` fires once when the user drops the item. Both must update state
	// or the DOM will snap back to the previous order.
	function handleTodoConsider(e: CustomEvent<DndEvent<DndItem>>) {
		todoItems = e.detail.items;
	}
	function handleTodoFinalize(e: CustomEvent<DndEvent<DndItem>>) {
		todoItems = e.detail.items;
	}
	function handleDoneConsider(e: CustomEvent<DndEvent<DndItem>>) {
		doneItems = e.detail.items;
	}
	function handleDoneFinalize(e: CustomEvent<DndEvent<DndItem>>) {
		doneItems = e.detail.items;
	}

	// ═══════════════════════════════════════════════════════════════════════════════
	// SECTION 3 — SUPERFORMS
	// ═══════════════════════════════════════════════════════════════════════════════

	// IMPORTANT: `superForm(data.form)` takes the server-validated form returned by
	// `+page.server.ts` and wires up client-side validation, error messages and
	// progressive enhancement — no full page reload needed.
	// `untrack` suppresses Svelte 5's state_referenced_locally warning: we
	// intentionally capture data.form once at init time (form data doesn't change
	// within a single page view).
	const { form, errors, message, enhance, submitting } = untrack(() =>
		superForm(data.form, {
			// IMPORTANT: `resetForm: true` clears all fields after a successful submission.
			resetForm: true
		})
	);
</script>

<svelte:head>
	<title>19 · Mejores dependencias</title>
</svelte:head>

<div class="mx-auto max-w-5xl space-y-12 py-8">
	<h1 class="text-3xl font-bold">Mejores dependencias</h1>
	<p class="text-muted-foreground text-sm">
		<strong>bits-ui</strong> (shadcn-style) · <strong>svelte-dnd-action</strong> ·
		<strong>Superforms + Zod</strong>
	</p>

	<!-- ═══════════════════════════════════════════════════════════════════════════
	     SECTION 1 — CALENDAR WITH hh:mm:ss
	     IMPORTANT: bits-ui exposes Calendar.Root, Calendar.Header, Calendar.Grid,
	     Calendar.Cell, etc. as sub-components. We compose them manually to get
	     full control over styling — identical to how shadcn/ui works internally.
	     ════════════════════════════════════════════════════════════════════════ -->
	<section class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-xl font-semibold">📅 Calendario interactivo (bits-ui + shadcn style)</h2>

		<div class="flex flex-col items-start gap-6 lg:flex-row">
			<!-- Calendar widget -->
			<!-- IMPORTANT: `type="single"` is required by bits-ui v2 — without it the
			     compiler complains that the `type` discriminant is missing. -->
			<Calendar.Root
				type="single"
				value={value}
				onValueChange={(next) => (value = next)}
				weekdayFormat="short"
				class="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
			>
				{#snippet children({ months, weekdays })}
					<!-- Navigation header -->
					<Calendar.Header class="mb-3 flex items-center justify-between">
						<Calendar.PrevButton
							class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
						>
							‹
						</Calendar.PrevButton>
						<Calendar.Heading class="text-sm font-semibold" />
						<Calendar.NextButton
							class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
						>
							›
						</Calendar.NextButton>
					</Calendar.Header>

					<!-- Month grid -->
					<!-- IMPORTANT: bits-ui passes `months` as an array; key by the month value
					     string so Svelte can track DOM nodes when navigating between months. -->
					{#each months as month (month.value.toString())}
						<Calendar.Grid class="w-full border-collapse">
							<!-- Day-of-week labels -->
							<Calendar.GridHead>
								<Calendar.GridRow class="flex">
									<!-- IMPORTANT: weekdays is an array of locale strings — key by value. -->
									{#each weekdays as weekday (weekday)}
										<Calendar.HeadCell
											class="w-9 rounded-md text-center text-xs font-medium text-zinc-400"
										>
											{weekday.slice(0, 2)}
										</Calendar.HeadCell>
									{/each}
								</Calendar.GridRow>
							</Calendar.GridHead>

							<!-- Weeks -->
							<Calendar.GridBody>
								<!-- IMPORTANT: key weeks by their first date string to avoid flicker. -->
								{#each month.weeks as weekDates, wi (wi)}
									<Calendar.GridRow class="mt-1 flex w-full">
										<!-- IMPORTANT: key each day cell by its toString() value. -->
										{#each weekDates as date (date.toString())}
											<Calendar.Cell
												{date}
												month={month.value}
												class="relative p-0"
											>
												<!-- IMPORTANT: Tailwind v4 uses `data-selected:` shorthand
												     instead of the Tailwind v3 `data-[selected]:` syntax. -->
												<Calendar.Day
													class="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-sm
													       transition-colors
													       hover:bg-zinc-100
													       data-selected:bg-zinc-900 data-selected:text-white
													       data-today:font-bold data-today:underline
													       data-outside-month:opacity-30
													       dark:hover:bg-zinc-700
													       dark:data-selected:bg-white dark:data-selected:text-zinc-900"
												/>
											</Calendar.Cell>
										{/each}
									</Calendar.GridRow>
								{/each}
							</Calendar.GridBody>
						</Calendar.Grid>
					{/each}

					<!-- ─── TIME PICKER inside the calendar ──────────────────────────
					     IMPORTANT: hh:mm:ss are plain <input type="number"> fields
					     bound to Svelte state. They sit inside the Calendar.Root snippet
					     so they appear as part of the calendar widget itself.
					     The selected date + time are merged in `selectedDatetime`.
					     ──────────────────────────────────────────────────────────── -->
					<div class="mt-4 border-t pt-4">
						<p class="mb-2 text-xs font-medium text-zinc-500">Hora seleccionada</p>
						<div class="flex items-center gap-1 font-mono text-sm">
							<!-- IMPORTANT: min/max constrain input to valid clock ranges. -->
							<input
								type="number"
								min="0"
								max="23"
								bind:value={hours}
								class="w-12 rounded-md border px-1 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
							/>
							<span class="font-bold">:</span>
							<input
								type="number"
								min="0"
								max="59"
								bind:value={minutes}
								class="w-12 rounded-md border px-1 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
							/>
							<span class="font-bold">:</span>
							<input
								type="number"
								min="0"
								max="59"
								bind:value={seconds}
								class="w-12 rounded-md border px-1 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
							/>
						</div>
					</div>
				{/snippet}
			</Calendar.Root>

			<!-- Selected datetime display -->
			<div class="flex flex-col gap-2">
				<p class="text-sm text-zinc-500">Fecha y hora seleccionadas:</p>
				<code class="rounded-lg bg-zinc-100 px-4 py-3 font-mono text-base">
					{selectedDatetime}
				</code>
				<p class="mt-2 text-xs text-zinc-400">
					<strong>bits-ui</strong> expone <code>Calendar.Root</code>, <code>Calendar.Grid</code>,
					<code>Calendar.Cell</code>, etc. como sub-componentes sin estilos — igual que
					shadcn/ui internamente.<br />
					<code>@internationalized/date</code> provee <code>CalendarDate</code> para fechas
					inmutables y seguras con timezone.
				</p>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════════════════════
	     SECTION 2 — DRAG & DROP
	     IMPORTANT: `use:dndzone` attaches the drag-and-drop logic to any element.
	     `items` must be the same array bound to the state variable.
	     The library mutates a copy and emits `consider`/`finalize` events.
	     `flipDurationMs` controls the animation speed of items when reordering.
	     ════════════════════════════════════════════════════════════════════════ -->
	<section class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
		<h2 class="mb-1 text-xl font-semibold">🖱️ Drag & Drop (svelte-dnd-action)</h2>
		<p class="mb-4 text-xs text-zinc-500">
			Arrastra tarjetas entre las columnas "Por hacer" y "Hecho". Las listas aceptan ítems de la
			otra columna — <code>dndzone</code> gestiona el orden y el traspaso automáticamente.
		</p>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<!-- TO-DO column -->
			<div class="rounded-xl border border-violet-200 bg-violet-50/50 p-4">
				<h3 class="mb-3 font-semibold text-zinc-700 dark:text-zinc-300">📝 Por hacer</h3>
				<!-- IMPORTANT: `use:dndzone` receives `{ items }` and fires `consider`/`finalize`.
				     Without handling both events the list will flicker or not update. -->
				<div
					use:dndzone={{ items: todoItems, flipDurationMs: 200 }}
					onconsider={handleTodoConsider}
					onfinalize={handleTodoFinalize}
					class="min-h-24 space-y-2 rounded-lg border-2 border-dashed border-violet-200 p-2"
				>
					{#each todoItems as item (item.id)}
						<!-- IMPORTANT: The keyed `{#each}` with `item.id` is required so Svelte
						     and svelte-dnd-action stay in sync during reorder animations. -->
						<div
							class="cursor-grab rounded-lg border px-4 py-3 text-sm font-medium active:cursor-grabbing {item.color}"
						>
							{item.label}
						</div>
					{/each}
				</div>
			</div>

			<!-- DONE column -->
			<div class="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
				<h3 class="mb-3 font-semibold text-zinc-700 dark:text-zinc-300">✅ Hecho</h3>
				<div
					use:dndzone={{ items: doneItems, flipDurationMs: 200 }}
					onconsider={handleDoneConsider}
					onfinalize={handleDoneFinalize}
					class="min-h-24 space-y-2 rounded-lg border-2 border-dashed border-emerald-200 p-2"
				>
					{#each doneItems as item (item.id)}
						<div
							class="cursor-grab rounded-lg border px-4 py-3 text-sm font-medium active:cursor-grabbing {item.color}"
						>
							{item.label}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════════════════════
	     SECTION 3 — SUPERFORMS
	     IMPORTANT: `use:enhance` is the SvelteKit progressive-enhancement action.
	     Superforms overrides it with its own version that intercepts submits,
	     runs client-side Zod validation first, shows inline errors without a
	     page reload, and updates `$message` on success.
	     ════════════════════════════════════════════════════════════════════════ -->
	<section class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
		<h2 class="mb-1 text-xl font-semibold">📋 Superforms + Zod</h2>
		<p class="mb-4 text-xs text-zinc-500">
			El formulario valida en cliente <em>y</em> servidor usando el mismo esquema Zod definido en
			<code>+page.server.ts</code>. Sin recarga de página, con mensajes de error inline reactivos.
		</p>

		<!-- IMPORTANT: `method="POST"` is required for SvelteKit actions.
		     `use:enhance` (from superForm) intercepts the submit and handles
		     validation + error state without a full navigation. -->
		<form method="POST" use:enhance class="max-w-md space-y-4">
			<!-- Success / error banner -->
			{#if $message}
				<div class="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 border border-emerald-200">
					{$message}
				</div>
			{/if}

			<!-- Name field -->
			<div class="flex flex-col gap-1">
				<label for="name" class="text-sm font-medium">Nombre</label>
				<input
					id="name"
					name="name"
					type="text"
					bind:value={$form.name}
					placeholder="Ada Lovelace"
					class="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400
					       {$errors.name ? 'border-red-400 bg-red-50' : ''}"
				/>
				<!-- IMPORTANT: `$errors.name` is an array of strings returned by Zod.
				     Superforms populates it automatically after a failed validation. -->
				{#if $errors.name}
					<p class="text-xs text-red-500">{$errors.name[0]}</p>
				{/if}
			</div>

			<!-- Email field -->
			<div class="flex flex-col gap-1">
				<label for="email" class="text-sm font-medium">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					bind:value={$form.email}
					placeholder="ada@example.com"
					class="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400
					       {$errors.email ? 'border-red-400 bg-red-50' : ''}"
				/>
				{#if $errors.email}
					<p class="text-xs text-red-500">{$errors.email[0]}</p>
				{/if}
			</div>

			<!-- Message field -->
			<div class="flex flex-col gap-1">
				<label for="message" class="text-sm font-medium">Mensaje</label>
				<textarea
					id="message"
					name="message"
					rows="3"
					bind:value={$form.message}
					placeholder="Escribe tu mensaje aquí..."
					class="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400
					       {$errors.message ? 'border-red-400 bg-red-50' : ''}"
				></textarea>
				{#if $errors.message}
					<p class="text-xs text-red-500">{$errors.message[0]}</p>
				{/if}
			</div>

			<button
				type="submit"
				disabled={$submitting}
				class="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white
				       hover:bg-zinc-700 disabled:opacity-50 dark:bg-white dark:text-zinc-900
				       dark:hover:bg-zinc-200"
			>
				{$submitting ? 'Enviando…' : 'Enviar mensaje'}
			</button>
		</form>
	</section>
</div>

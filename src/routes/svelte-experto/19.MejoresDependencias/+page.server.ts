// IMPORTANT: Superforms requires a server-side load function that builds the form schema
// and returns it via `superValidate`. The client then receives the validated form object.
// Using Zod v4 with sveltekit-superforms/adapters.

import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { fail } from '@sveltejs/kit';

// IMPORTANT: Define the Zod schema that describes the form fields and their validation rules.
const contactSchema = z.object({
	name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
	email: z.string().email('Introduce un email válido'),
	message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
});

// IMPORTANT: `load` must call `superValidate` and return its result so the
// client component can call `superForm(data.form)` to get reactivity + validation.
export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(contactSchema));
	return { form };
};

// IMPORTANT: The `default` action receives the POST, validates it server-side,
// and returns errors or a success message back to the client automatically.
export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(contactSchema));

		if (!form.valid) {
			// IMPORTANT: `fail(400, { form })` sends validation errors back to the
			// client without a page reload — Superforms handles the state update.
			return fail(400, { form });
		}

		// In a real app you would persist data here (DB, email, etc.)
		return message(form, '¡Mensaje enviado correctamente! ✅');
	}
};

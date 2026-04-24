// React 19: useActionState for form mutations
// This replaces the common useState + useEffect + loading/error state pattern
import { useActionState } from 'react';
import type { FormState } from '../types';

// ── Action function ───────────────────────────────────────────────────────────
// Lives OUTSIDE the component — it's a plain async function, not a hook
// In a real app this would call your .NET 8 / Azure Function API
async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  // Simulate API call (replace with actual Azure Function endpoint)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate occasional error (20% chance) — so you can test error state
  if (Math.random() < 0.2) {
    return { success: false, error: 'Server error. Please try again.' };
  }

  return {
    success: true,
    error: null,
    submittedAt: new Date().toISOString(),
  };
}

// ── ContactForm ───────────────────────────────────────────────────────────────
export default function ContactForm() {
  // useActionState(action, initialState) → [state, formAction, isPending]
  // React 19 built-in — no manual loading/error booleans needed
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    error: null,
  });

  return (
    <section className="contact-section">
      <h2>Contact Form — React 19 useActionState Demo</h2>
      <p className="hint">
        Uses <code>useActionState</code> — no manual <code>useState</code> for loading or error.
      </p>

      {state.success ? (
        <div className="success-message" role="status">
          <strong>Message sent!</strong>
          <p>Submitted at: {state.submittedAt}</p>
          {/* In a real app, you'd show a reset button or redirect */}
        </div>
      ) : (
        <form action={formAction} className="contact-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              disabled={isPending}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={isPending}
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              disabled={isPending}
              rows={4}
              placeholder="Your message..."
            />
          </div>

          {state.error && (
            <p className="error-message" role="alert">
              {state.error}
            </p>
          )}

          <button type="submit" disabled={isPending} className="submit-btn">
            {isPending ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      )}
    </section>
  );
}

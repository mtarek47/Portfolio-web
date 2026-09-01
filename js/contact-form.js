/**
 * CONTACT FORM CLIENT SCRIPT
 * Preserves Google Apps Script integration with sketch error/success feedback
 */

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXsiM3tNF_LOxBpIJn2Q5jGSvABXEsNYAgVqapzEzXb9ZcYPrCxRmwOR7ijk_6cRQFzw/exec';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const subjectInput = contactForm.querySelector('input[name="subject"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');

    const formData = {
      name: nameInput ? nameInput.value.trim() : '',
      email: emailInput ? emailInput.value.trim() : '',
      subject: subjectInput ? subjectInput.value.trim() : '',
      message: messageInput ? messageInput.value.trim() : ''
    };

    if (!formData.name || !formData.email || !formData.message) {
      showSketchMessage('Please fill in all required fields.', 'error');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending telemetry...</span>`;
    }

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      showSketchMessage('Message sent successfully! I will get back to you shortly.', 'success');
      contactForm.reset();
    } catch (error) {
      console.error('Contact Form Error:', error);
      showSketchMessage('Oops! Could not deliver message. Please email directly at tarekparvez47@gmail.com', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          Send Message
        `;
      }
    }
  });

  function showSketchMessage(message, type) {
    const existingMessage = document.querySelector('.sketch-form-alert');
    if (existingMessage) existingMessage.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = `sketch-form-alert sketch-card ${type === 'success' ? 'accent-blue' : 'accent-coral'}`;
    alertDiv.style.cssText = `
      margin-bottom: 1.5rem;
      padding: 1rem 1.25rem;
      font-family: var(--font-mono);
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.65rem;
      background: ${type === 'success' ? 'var(--accent-green-light)' : 'var(--accent-coral-light)'};
      border-color: ${type === 'success' ? 'var(--accent-green)' : 'var(--accent-coral)'};
      color: var(--text-ink);
    `;

    const icon = type === 'success'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-coral)" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    alertDiv.innerHTML = `${icon} <span>${message}</span>`;
    contactForm.parentNode.insertBefore(alertDiv, contactForm);

    setTimeout(() => {
      alertDiv.remove();
    }, 6000);
  }
});
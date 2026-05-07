const form = document.getElementById("surveyForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    message.textContent = "Submitting...";

    const payload = Object.fromEntries(new FormData(form));

    try {
        const res = await fetch("http://127.0.0.1:8000/submit-survey", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            message.textContent = "Thanks! Your response was saved.";
            form.reset();
        } else {
            const err = await res.json();
            message.textContent = "Error: " + (err.detail || "submission failed");
        }
    } catch (err) {
        message.textContent = "Network error: " + err.message;
    } finally {
        submitBtn.disabled = false;
    }
});
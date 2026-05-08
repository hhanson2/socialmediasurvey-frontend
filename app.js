const form = document.getElementById("surveyForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    message.textContent = "Submitting...";

    try {
        const res = await fetch(form.action, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: new FormData(form),
        });

        if (res.ok) {
            message.textContent = "Thanks! Your response was saved.";
            form.reset();
        } else {
            message.textContent = "Something went wrong. Please try again.";
        }
    } catch (err) {
        message.textContent = "Network error. Please try again.";
    } finally {
        submitBtn.disabled = false;
    }
});
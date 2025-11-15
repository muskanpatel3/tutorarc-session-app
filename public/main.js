document.getElementById("startBtn").addEventListener("click", async () => {
    try {
        const response = await fetch("/api/start-session", {
            method: "POST"
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = data.session.userurl;
        }

    } catch (err) {
        alert("Something went wrong. Please try again.");
        console.error(err);
    }
});

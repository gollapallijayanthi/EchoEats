document.addEventListener("DOMContentLoaded", () => {
  // Signup Logic
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("signupUsername").value;
      const password = document.getElementById("signupPassword").value;
      localStorage.setItem("echoeats_user", JSON.stringify({ username, password }));
      alert("Sign up successful! Please log in.");
      window.location.href = "login.html";
    });
  }

  // Login Logic
  const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const storedUser = JSON.parse(localStorage.getItem("echoeats_user"));
    const errorMessage = document.getElementById("loginError"); // optional line

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      localStorage.setItem("echoeats_loggedInUser", username);
      alert("Login successful!");
      window.location.href = "index.html"; // ✅ Redirect to home page
    } else {
      if (errorMessage) {
        errorMessage.textContent = "Invalid username or password.";
      } else {
        alert("Invalid username or password.");
      }
    }
  });
}

  // Donation Submission Logic (matching your form HTML)
  const donateForm = document.getElementById("donationForm");
  if (donateForm) {
    donateForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const donation = {
        name: document.getElementById("donorName").value,
        foodItem: document.getElementById("foodItem").value,
        quantity: document.getElementById("quantity").value,
        location: document.getElementById("location").value,
        expiry: document.getElementById("expiry").value
      };

      const existing = JSON.parse(localStorage.getItem("echoeats_donations")) || [];
      existing.push(donation);
      localStorage.setItem("echoeats_donations", JSON.stringify(existing));

      alert("Thank you! Your donation has been submitted.");
      document.getElementById("donationMessage").textContent = "Donation submitted successfully!";
      donateForm.reset();
    });
  }

  // Load donations to dashboard
  const donationList = document.getElementById("donationList");
  if (donationList) {
    const donations = JSON.parse(localStorage.getItem("echoeats_donations")) || [];
    if (donations.length === 0) {
      donationList.innerHTML = "<p>No donations yet.</p>";
    } else {
      donationList.innerHTML = "";
      donations.forEach(donation => {
        const div = document.createElement("div");
        div.classList.add("donation-item");
        div.innerHTML = `
          <h3>${donation.foodItem}</h3>
          <p><strong>Donor:</strong> ${donation.name}</p>
          <p><strong>Quantity:</strong> ${donation.quantity}</p>
          <p><strong>Pickup at:</strong> ${donation.location}</p>
          <p><strong>Best Before:</strong> ${donation.expiry}</p>
        `;
        donationList.appendChild(div);
      });
    }
  }
});

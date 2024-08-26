document.addEventListener("DOMContentLoaded", function() {
	// Get all the nav links and sections
	const navLinks = document.querySelectorAll('header a');
	const sections = document.querySelectorAll('section');
	
	// Function to hide all sections
	function hideAllSections() {
		sections.forEach(section => section.style.display = 'none');
	}

	// Function to show the selected section
	function showSection(sectionId) {		
		hideAllSections();
		document.querySelector(sectionId).style.display = 'block';
	}

	// Add click event listeners to each nav link
	navLinks.forEach((link, index) => {
		link.addEventListener('click', function(event) {
			localStorage.setItem('activeSection', index)

			event.preventDefault(); // Prevent the default anchor behavior
			const sectionId = link.getAttribute('href');
			showSection(sectionId);
		
			// Update active class for the clicked link
			navLinks.forEach(link => link.classList.remove('active'));

			if (index == 0) {
				const home = Array.from(navLinks).find((link, index) => link.getAttribute('href') === '#home' && index !== 0);
				home.classList.add('active');
				return;
			}

			this.classList.add('active');	
		});
	});
	
	// Show the home section by default on page load
	const lastSectionIndex = localStorage.getItem("activeSection");
	
	if (lastSectionIndex !== null) {
		const navAnchor = navLinks[lastSectionIndex];
		const sectionID = navAnchor.getAttribute('href');

		if (lastSectionIndex === 0) {
			const home = Array.from(navLinks).find(link => link.getAttribute('href') === '#home' && index !== 0);
			home.classList.add('active');
		}
		else {
			navAnchor.classList.add('active');
		}
		
		showSection(sectionID);
	}
	else {
		localStorage.setItem('activeSection', 0)
		showSection('#home');
	}
});
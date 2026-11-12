"use strict";

// ---------------------------------------------------------
// TODO: Start in the HTML file head, we need to link to the 
// resources we need to get the jQuery and Spectrum Color 
// picker plugin working
// ---------------------------------------------------------


// ---------------------------------------------------------
// JQUERY UI
// ---------------------------------------------------------
// page load function - can use this with async
$(function () {
	// this updates the copyright year in the footer
	let now = new Date();
	$("footer span").html(now.getFullYear());

	// this will format the code snippets on the page with the Highlight.js library
	hljs.highlightAll();

	// ---------------------------------------------------------
	// The Spectrum Color Picker Plugin
	// ---------------------------------------------------------
	/*
		https://www.npmjs.com/package/spectrum-colorpicker
		documentation - http://bgrins.github.io/spectrum/

		Plugins are a really fun way to work with jQuery. They offer the ability to include some functionality on your site that isn't built into the library itself, but that other developers have found useful. Things like slideshows, color pickers, form validation options, and tons of other types of plugins are available through npm

		We will use the CDN with this plugin, find the links here (CSS and JS): https://github.com/bgrins/spectrum#using-spectrum-with-a-cdn

		--- FOR OUR VERSION: ---
			- Preferred Format: http://bgrins.github.io/spectrum/#options-preferredFormat
				- preferred color format is three-digit hex values
			- Flat: http://bgrins.github.io/spectrum/#modes-flat
				- always display at full size (flat)
			- Show Input: http://bgrins.github.io/spectrum/#options-showInput
				- show an input where users can type in a color
			- Color: http://bgrins.github.io/spectrum/#options-color
				- set a default color on page load of our hot pink value (#f63077)
			- Show Buttons: http://bgrins.github.io/spectrum/#options-showButtons
				- hide the buttons, we don't need them
			- Move Event: http://bgrins.github.io/spectrum/#events-move
				- on the move event, update the value of our "--svg" CSS variable on the root element to the selected color
	*/
	// add the color picker with the settings/features listed above
	$("#flat").spectrum({
		preferredFormat: "hex3",
		flat: true,
		showInput: true,
		color: "#f63077",
		showButtons: false,
		move: (color) => {
			let root = document.documentElement;
			let newColor = color.toHexString();
			root.style.setProperty("--svg", newColor);
		}
	});
	// when the color picker is created, the input is added to allow 
	// the user to type a color in that they want to see
	// this element isn't given a name or id, which is an accessibility 
	// issue, so I am going to add one myself to fix that issue
	// the input the plugin adds has a class of "sp-input"
	$("input.sp-input").attr("id", "color-input");

	// ---------------------------------------------------------
	// Accordion Widget
	// ---------------------------------------------------------
	/*
		https://jqueryui.com/accordion

		let's implement an accordion in this section of the page. Notice the pattern they show for the HTML in the documentation, and notice the pattern I've used instead. Yes, they show headings and divs contained within a div, but that doesn't mean that you're prevented from using semantic containers if you'd prefer to. jQuery is also adding aria attributes for us to the elements inside of the outer container to make them more accessible

		--- Some options to choose from: ---

		- active: which panel is currently open, setting to false closes all panels, which requires collapsible to be set to true

		- animate: if and how to animate panel change
			- set to number: duration of ms with default easing
			- set to string: name of easing to use with default duration
			- set to object: include both easing and duration to set both

		- collapsible: true or false to allow for all panels to be closed at the same time, otherwise one is always open

		- heightStyle: controls height of each panel
			- set to "auto": all panels same height as tallest panel
			- set to "fill": expand to available height based on parent height
			- set to "content": each panel only as tall as its content

		- icons: icons to use for headers, matching those from the jQuery UI CSS framework (https://api.jqueryui.com/theming/icons/)
			- set to false: no icons
			- header: icon to use for standard header
			- activeHeader: icon to use for active/selected header
		
		As long as you understand the pattern you need to follow for the HTML and you make sure to include all of the necessary files, getting a jQuery accordion or other widget working on your page is quick and easy. The only CSS I edited here was the padding on the inner sections, because the default styling was making them wider than the headings. To fix that, I right-clicked on one of the containers to inspect it, copied the selector that was being used to target that element from the styles pane in the dev tools, and changed the padding styles in my CSS

		--- FOR OUR VERSION: ---
			- allow collapsing all panels
			- all panels should be collapsed on page load
			- customize the icons: 
				- the activeHeader icon should use the "ui-icon-caret-1-s"
				- the header icon should use the "ui-icon-caret-1-e"
	*/
	// add the accordion to the page with the settings/features listed above
	$("#accordion").accordion({
		collapsible: true,
		active: false,
		icons: {
			header: "ui-icon-caret-1-e",
			activeHeader: "ui-icon-caret-1-s"
		}
	});

	// ---------------------------------------------------------
	// Color Effects in jQuery UI
	// ---------------------------------------------------------
	/*
		https://jqueryui.com/animate/
		(color animation documentation is on GitHub: https://github.com/jquery/jquery-color/)
		
		Animating the change between colors is possible with jQuery UI and the Color hook. 

		--- FOR OUR VERSION ---
			- The animation should happen when the user hovers over the SVG (which means the handler has two parts)
			- register the jQuery color hook for fill on the paths of our SVG (jQuery.Color.hook("fill");)
			- For all animations, the speed setting should be "slow"
			- Path 1: 
				- mouse enter: #87d036
				- mouse leave: #ef131f
			- Path 2:
				- mouse enter: #ea842f
				- mouse leave: #5136d0
			- Path 3
				- mouse enter: #d71db4
				- mouse leave: #36d0b8
	*/
	// Add the color animation to the SVG when a user hovers over it as described above
	$("#animations svg").on({
		mouseenter: () => {
			jQuery.Color.hook("fill");

			$("#path1").animate({
				fill: "#87d036"
			}, "slow");

			$("#path2").animate({
				fill: "#ea842f"
			}, "slow");

			$("#path3").animate({
				fill: "#d71db4"
			}, "slow");

		},
		mouseleave: () => {
			jQuery.Color.hook("fill");

			$("#path1").animate({
				fill: "#ef131f"
			}, "slow");

			$("#path2").animate({
				fill: "#5136d0"
			}, "slow");

			$("#path3").animate({
				fill: "#36d0b8"
			}, "slow");
		}
	});

	// ---------------------------------------------------------
	// Animation Between Classes in jQuery UI
	// ---------------------------------------------------------
	/*
		https://jqueryui.com/switchClass/

		We can also animate the changes between two classes, which we'll do on the paragraph in this section

		--- FOR OUR VERSION ---
			- When the user clicks on the button in this section:
				- switch from the style1 class to the style2 class over 4000ms
				- switch back over the same time frame
	*/
	// add an animation from one class to another and back again on button click as described above
	$("#switchClass button").on("click", () => {
		$("#switchClass p").switchClass("style1", "style2", 4000);
		$("#switchClass p").switchClass("style2", "style1", 4000);
	});
	// ---------------------------------------------------------
	// Tabs Widget
	// ---------------------------------------------------------
	/*
		https://jqueryui.com/tabs/

		--- FOR OUR VERSION ---
			- Default tabs
	*/
	// add the tabs to the page with the settings/features listed above
	$(".tabs").tabs();
	// ---------------------------------------------------------
	// Datepicker Widget
	// ---------------------------------------------------------
	/*
		https://jqueryui.com/datepicker/

		The datepicker has a lot of functionality available, including allowing you to choose date formatting based on the user's location and allowing you to customize the appearance of the calendar shown. Making a div into a datepicker instead of an input allows you to display it open at all times by default.

		--- FOR OUR VERSION ---
			- date format: "DD, MM d, yy"
			- onSelect:
				- call the change event (Yes, it's weird. No, it doesn't work without it currently.)
			- on the change event:
				- Display the value the user selected in the paragraph in this section after the text "<strong>You Have Selected:</strong> "
	*/
	// TODO: add the datepicker to the page with the settings/features listed above;
	$("#datepicker").datepicker({
		dateFormat: "DD, MM d, yy",
		onSelect: function(){
			$(this).change();
		}
	})
	.on("change", function(){
		$("#dateDisplay").html("<strong>You have selected: </strong>" + $(this).val())
	});
	// ---------------------------------------------------------
	// AutoComplete
	// ---------------------------------------------------------
	/*
		https://jqueryui.com/autocomplete/

		With the autocomplete widget, you can give users the ability to search through a specific list of items and select one without needing to type everything. This can be helpful on sites with specific products that you want to allow the user to filter or search by name

		--- FOR OUR VERSION: ---
			- use the faculty array as the source of autocomplete options
			- when the user selects one of the options (by clicking or hitting enter when that value is highlighted):
				- display the name selected after the text "<strong>You have chosen:</strong>"
	*/
	let faculty = [
		"Laura Cechanowicz",
		"Penny Dolin",
		"Deborah Prewitt",
		"Christina Carrasquilla",
		"Chad Westover",
		"Jessica Barnett",
		"Kassidy Breaux",
		"Tessa Etzioni",
		"John Hentges",
		"Cameron Rennacker",
		"benjie wilhelm",
		"Licia Bailey",
		"Philip Clark",
		"Amber Draina",
		"Katherine Hillerman",
		"Melissa Hopkins",
		"Emily Sangmeister",
		"Cynthia Storm"
	];

	// add the autocomplete widget to the page with the settings/features listed above
	$("#mentor").autocomplete({
		source: faculty,
		select: (event, ui) => {
			$("#mentor").val(ui.item.value);
			$("#auto-output").html("<strong>You have chosen: </strong>" + $("#mentor").val());
		}
	})
	// ---------------------------------------------------------
	// Dialog Widget (Modal/Popup)
	// ---------------------------------------------------------
	/*
		https://jqueryui.com/dialog/

		A dialog/modal/popup is something you might see often on the web. With jQuery UI, we can control the animations used to open and close the modal. You might use a modal for a form popup or confirmation, and this widget gives you more control over the appearance of the modal, especially when compared to things like an alert from the browser window.

		--- FOR OUR VERSION: ---
			- disable auto open (this should only be visible when the user clicks a button to view it)
			- on show:
				- use the blind effect
				- duration should be 2000
			- on hide: 
				- use the fade effect
				- duration should be 2000
			- When a user clicks on the button in this section, it should open the dialog
	*/
	// add the dialog to the page with the settings/features listed above
	$("#dialog").dialog({
		autoOpen: false,
		show: {
			effect: "blind",
			duration: 2000
		},
		hide: {
			effect: "fade",
			duration: 2000
		}
	});
	$("#openDialog").on("click", function(){
		$("#dialog").dialog("open");
	} )

	// ---------------------------------------------------------
	// Tooltip Widget
	// ---------------------------------------------------------
	/*
		https://jqueryui.com/tooltip/

		as mentioned on the page, a tooltip is usually very small text that is visible when hovering over an interactive element on the page. This text comes from the title attribute, but is not something that can be styled. jQuery allows for styling and makes tooltips easier to see and read

		let's add the tooltip functionality to the page. By selecting the document, any element on the page with a title attribute will use the larger/styled jQuery tooltip instead of the default

		--- FOR OUR VERSION: ---
			- Default tooltip
	*/
	// add tooltips to the page with the settings/features listed above
	$(document).tooltip();
});
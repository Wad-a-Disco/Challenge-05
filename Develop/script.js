$(function () {
  // Add a listener for click events on the save button. This code will use the id in the containing time-block as a key to save the user input in local storage
  $(".saveBtn").on("click", function () {
  const hour = $(this).parent().attr("id");
  const description = $(this).siblings(".description").val();
  localStorage.setItem(hour, description);
  });
  
  // Apply the past, present, or future class to each time block by comparing the id to the current hour
  function updateHourly() {
  const currentHour = dayjs().hour();
  $(".time-block").each(function () {
  const blockHour = parseInt($(this).attr("id").split("-")[1]);
  if (blockHour < currentHour) {
  $(this).addClass("past").removeClass("present future");
  } else if (blockHour === currentHour) {
  $(this).addClass("present").removeClass("past future");
  } else {
  $(this).addClass("future").removeClass("past present");
  }
  });
  }
  
  // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  $(".description").each(function () {
  const hour = $(this).parent().attr("id");
  const description = localStorage.getItem(hour);
  if (description !== null) {
  $(this).val(description);
  }
  });
  
  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  
  // Update hourly to apply correct classes
  updateHourly();
  
  // Set interval to update hourly
  setInterval(updateHourly, 10006010); // every 10 minutes
  });
$(function() {
    $("#ResumeName").html( "<b>Sergey Zolotykh</b>" );

    // Skils
    ResumeSkils.forEach(c => {
      var half = Math.ceil(c.skils.length/2);
      $("#ResumeSkils").append(`<p><b>${c.category}</b></p>`);
      $("<div class='w3-cell s6'>").addClass('w3-container')
        .append(c.skils.slice(0, half).map(skill => `<div class="w3-container">${skill}</div>`))
        .appendTo("#ResumeSkils");
      $("<div class='w3-container w3-cell s6'>")
        .append(c.skils.slice(half).map(skill => `<div class="w3-container">${skill}</div>`))
        .appendTo("#ResumeSkils");
    });
    
    // Work Experience
    ResumeExperience.forEach(c => {
      $('<div>').addClass('w3-container')
      .append(`<h5 class="w3-opacity"><b>${c.position}</b></h5>`)
      .append(`<p>${c.discription}</p>`)
      .append(`<h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>${c.timeframe}</h6>`)
      .append('<hr>')
      .appendTo('#ResumeExperience')
    });

    // Education
    ResumeEducation.forEach(c => {
      $('<div>').addClass('w3-container')
      .append(`<h5 class="w3-opacity"><b>${c.university}</b></h5>`)
      .append(`<p>${c.degree}</p>`)
      .append(`<h6><i class="fa fa-calendar fa-fw w3-margin-right"></i>${c.timeframe}</h6>`)
      .append('<hr>')
      .appendTo('#ResumeEducation')
    });

    var displayProjectImage = function(img){
      if (img != undefined)
        return $(`<img src="${img}" width="180px" alt="model3">`)
      else
        return null;
    }

    var displayProjectLinks = function(links){
      if (links != undefined)
        return links.map(link => `<p>${link.text}: <a href="${link.url}" target="_blank">${link.url}</a></p>`)
      else
        return null;
    }

    // Projects
    ResumeProjects.forEach(c => {
      $('<div>').addClass('w3-container')
      .append(`<h5 class="w3-opacity"><b>${c.name}</b></h5>`)
      .append($('<div>').addClass('w3-twothird')
        .append(`<p>${c.discription}</p>`)
        .append(displayProjectLinks(c.links))
        .append(`<h6><i class="fa fa-calendar fa-fw w3-margin-right"></i>${c.timeframe}</h6>`))
      
      .append($('<div>').addClass('w3-third w3-center')
        .append(displayProjectImage(c.image)))
      .appendTo('#ResumeProjects');
      $('<hr>').appendTo('#ResumeProjects');
    });
});
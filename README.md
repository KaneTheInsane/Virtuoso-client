# Virtuoso Music Training

This is Virtuoso, a learning tool for musicians to hone their skills and keep track of their practice session. Version 1 is a simple tracker. Version 2 will add components to view how much time has been spent and visualize that time on a calender

### Technologies used:
*  Git
*  AJAX
*  jQuery
*  Bootstrap
*  Handlebars
*  Javascript
*  HTML
*  CSS
*  SASS
*  GitHub
*  GitHub Enterprise
*  Heroku

**Nothing needs to be installed to run and use this program besides a web browser**

 **[You can use my app here](https://kanetheinsane.github.io/Virtuoso-client/)**

## My organizational strategy and process

I built version 1, 2 and 3 in a 4 day period, I approached the problem by breaking it up into steps. And defining MVP for each
First I made my [wireframe](https://wireframe.cc/UPHLJu) and [user stories](https://docs.google.com/document/d/1wudfHGWM7rPGWo77dNYKamerVRqQxQKFvquoIPEU17Q/edit)
in order to understand what I wanted the MVP to look like. The next step for me was building the api, my api is very simple for version 1. I then moved on to my frontend client. I used some code from my last project to build off of. Further breaking things into steps I build buttons for the user to move through different functionalities of the page. After tackling that I moved into my authorization methods built using Ajax and Jquery to communicate to an API that was already built. Finally I built the stylized the page using css and sass.

My over all strategy to keep things moving was to focus on what I knew I could complete first and continue working on that one piece until I was finished without jumping around. By doing this I could make sure I was building off of working componentes. The pieces that worked well could further guide my programming decisions.
Additionally focusing on the MVP was important. I was able to finish that very quickly by staying on task making everything else easy to create

**[Repo for Virtuoso API](https://github.com/KaneTheInsane/Virtuoso-api)**

### Some problems left to solve

**Things to add:**

  To do on 04/07/20:
  * check requirements to make sure to meet MVP
  * Make logo
  * space out buttons and add margins to forms
  * Make instrument case insesitive
  * Delete and update refresh table
  * add dropdown selector for instrument stats
  * add account dropdown for change password modal and logout button
  * create sign in/sign up home page
  * add background image


  * Metronome
  * or total practice time on a day
  * show calender with all days practiced
  * add exercise to practices (Practices have_many Exercises)
  * progress bar to master
  * have search funtion for certain dates, instruments, start time, or duration

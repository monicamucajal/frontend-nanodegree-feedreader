/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('validates allFeeds variable is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('validates that the feed URL defined and not empty', function() {
            var LengthOfArray = allFeeds.length;
            for (var i = 0; i < LengthOfArray; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);           
            }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('validates that the feed name defined and not empty', function() {
            var LengthOfArray = allFeeds.length;
            for (var i = 0; i < LengthOfArray; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);           
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var $body = $('body');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('validates the menu element is hidden by default', function() {
        //The css transform is used to hide the menu (menu-hidden class).
        //Store the body of the html file into a variable to then check if it is using the menu-hidden css class
            //var $body = $('body');
            //Test if body element has 'menu-hidden' class by default
            expect($body.hasClass('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('validates that the menu changes visibility when clicked', function() {
            var menuIcon = $('.menu-icon-link'); //from app.js
            menuIcon.click(); // by default the menu is hidden, so this first click will make the menu show
            expect($body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click(); // this second click makes the menu hide
            expect($body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    describe('Initial Entries', function() {
        /* call to loadFeed function to get the first feed of allFeeds to the page*/
        beforeEach(function(done) {
            loadFeed(0, done) 
            //Test will start when we get data from feed (async load)
        });
        /* Ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
        it('validates it has at least a single .entry within the feed container', function(done) {
            //The length of an empty string is 0
            var $entry = $('.feed .entry');
            //expect($entry.length > 0).toBe(true);
            //Not using this because failure can be something other than length being 0 (undefined, etc): expect($entry.length).not.toBe(0);
            expect($entry.length).toBeGreaterThan(0);
            done();
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function () {
        // Declare variables to store the first and second feeds (to later compare the two)
        var firstFeed;
        var secondFeed;
        // Call the loadFeed func aynchronously and store the first and second feeds
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeed = $('.feed').html();
                done();
                console.log(firstFeed);
            });       
            loadFeed(1, function () {
                secondFeed = $('.feed').html();
                //done();
                console.log(secondFeed);
            });
        });
        it('validates that a new feed has been loaded', function (done) {
             expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });
}());

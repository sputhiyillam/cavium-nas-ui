BOOTSTRAP = ./css/cavium.css
BOOTSTRAP_LESS = ./less/bootstrap.less
BOOTSTRAP_RESPONSIVE = ./css/cavium-responsive.css
BOOTSTRAP_RESPONSIVE_LESS = ./less/responsive.less
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#


#
# BUILD DOCS
#

build:
	@echo "\n${HR}"
	@echo "Building Bootstrap..."
	@echo "${HR}\n"
	@jshint js/libs/bootstrap/*.js --config js/libs/bootstrap/.jshintrc
	@jshint js/libs/bootstrap/tests/unit/*.js --config js/libs/bootstrap/.jshintrc
	@echo "Running JSHint on javascript...             ${CHECK} Done"
	@recess --compile ${BOOTSTRAP_LESS} > ${BOOTSTRAP}
	@recess --compile ${BOOTSTRAP_RESPONSIVE_LESS} > ${BOOTSTRAP_RESPONSIVE}
	@echo "Compiling LESS with Recess...               ${CHECK} Done"
	@cat js/libs/bootstrap/bootstrap-transition.js js/libs/bootstrap/bootstrap-alert.js js/libs/bootstrap/bootstrap-button.js js/libs/bootstrap/bootstrap-carousel.js js/libs/bootstrap/bootstrap-collapse.js js/libs/bootstrap/bootstrap-dropdown.js js/libs/bootstrap/bootstrap-modal.js js/libs/bootstrap/bootstrap-tooltip.js js/libs/bootstrap/bootstrap-popover.js js/libs/bootstrap/bootstrap-scrollspy.js js/libs/bootstrap/bootstrap-tab.js js/libs/bootstrap/bootstrap-typeahead.js js/libs/bootstrap/bootstrap-affix.js > js/libs/bootstrap/cavium.js
	@uglifyjs js/libs/bootstrap/cavium.js -nc > js/libs/bootstrap/cavium.min.tmp.js
	@echo "/**\n* Bootstrap.js v2.2.2 by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > js/libs/bootstrap/copyright.js
	@cat js/libs/bootstrap/copyright.js js/libs/bootstrap/cavium.min.tmp.js > js/libs/bootstrap/cavium.min.js
	@rm js/libs/bootstrap/copyright.js js/libs/bootstrap/cavium.min.tmp.js
	@echo "Compiling and minifying javascript...       ${CHECK} Done"
	@echo "\n${HR}"
	@echo "Bootstrap successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Thanks for using Bootstrap,"
	@echo "<3 @mdo and @fat\n"

#
# RUN JSHINT & QUNIT TESTS IN PHANTOMJS
#

test:
	jshint js/libs/bootstrap/*.js --config js/libs/bootstrap/.jshintrc
	jshint js/libs/bootstrap/tests/unit/*.js --config js/libs/bootstrap/.jshintrc
	node js/libs/bootstrap/tests/server.js &
	phantomjs js/libs/bootstrap/tests/phantom.js "http://localhost:3000/js/libs/bootstrap/tests"
	kill -9 `cat js/libs/bootstrap/tests/pid.txt`
	rm js/libs/bootstrap/tests/pid.txt

#
# CLEANS THE ROOT DIRECTORY OF PRIOR BUILDS
#

clean:
	rm -fr js/libs/bootstrap/cavium.min.js js/libs/bootstrap/cavium.js ${BOOTSTRAP} ${BOOTSTRAP_RESPONSIVE}

#
# BUILD SIMPLE BOOTSTRAP DIRECTORY
# recess & uglifyjs are required
#

bootstrap:
	mkdir -p bootstrap/img
	mkdir -p bootstrap/css
	mkdir -p bootstrap/js
	cp img/* bootstrap/img/
	recess --compile ${BOOTSTRAP_LESS} > bootstrap/css/bootstrap.css
	recess --compress ${BOOTSTRAP_LESS} > bootstrap/css/bootstrap.min.css
	recess --compile ${BOOTSTRAP_RESPONSIVE_LESS} > bootstrap/css/bootstrap-responsive.css
	recess --compress ${BOOTSTRAP_RESPONSIVE_LESS} > bootstrap/css/bootstrap-responsive.min.css
	cat js/bootstrap-transition.js js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-typeahead.js js/bootstrap-affix.js > bootstrap/js/bootstrap.js
	uglifyjs bootstrap/js/bootstrap.js -nc > bootstrap/js/bootstrap.min.tmp.js
	echo "/*!\n* Bootstrap.js by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > bootstrap/js/copyright.js
	cat bootstrap/js/copyright.js bootstrap/js/bootstrap.min.tmp.js > bootstrap/js/bootstrap.min.js
	rm bootstrap/js/copyright.js bootstrap/js/bootstrap.min.tmp.js

#
# MAKE FOR GH-PAGES 4 FAT & MDO ONLY (O_O  )
#

gh-pages: bootstrap docs
	rm -f docs/assets/bootstrap.zip
	zip -r docs/assets/bootstrap.zip bootstrap
	rm -r bootstrap
	rm -f ../bootstrap-gh-pages/assets/bootstrap.zip
	node docs/build production
	cp -r docs/* ../bootstrap-gh-pages

#
# WATCH LESS FILES
#

watch:
	echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system 'make' }"


.PHONY: docs watch gh-pages

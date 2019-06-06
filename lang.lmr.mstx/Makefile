## language paths
LANG_DIR     =  ../lang.lmr/
LANG_ARCHIVE =  $(LANG_DIR)/target/lang.lmr-0.1.0-SNAPSHOT.spoofax-language
LANG_EXT     = lmr

## spoofax paths
SPX_VERSION  =  2.5.6
SUNSHINE_URL =  http://artifacts.metaborg.org/service/local/repositories/releases/content/org/metaborg/org.metaborg.sunshine2/$(SPX_VERSION)/org.metaborg.sunshine2-$(SPX_VERSION).jar
SUNSHINE_JAR =  bin/org.metaborg.sunshine2-$(SPX_VERSION).jar
SPEC         =  src/java.mstx

## external commands with configuration
MAVEN_OPTS   = "-Xms512m -Xmx1024m -Xss16m"
MAVEN        = MAVEN_OPTS=$(MAVEN_OPTS) mvn
SUNSHINE     = java -jar $(SUNSHINE_JAR)
PARSE        = $(SUNSHINE) parse -l $(LANG_DIR) -p . -i 
STATIX       = statix $(SPEC)

## project paths
TESTS       ?= tests/          # directory
TESTRE      ?= '*.$(LANG_EXT)' # iname
TEST_SOURCES = $(shell find $(TEST_DIR) -iname $(TESTRE))
TEST_ATERMS  = $(TEST_SOURCES:%.$(LANG_EXT)=%.aterm)
TEST_TARGETS = $(TEST_SOURCES:%.$(LANG_EXT)=%.result)

.PHONY: all test
.PRECIOUS: %.aterm

## Default target

all: test

## Get depenencies

bin:
	mkdir -p bin

# get spoofax sunshine
$(SUNSHINE_JAR): bin
	curl $(SUNSHINE_URL) -o $(SUNSHINE_JAR)

# ensure that spoofax sunshine is available
sunshine: $(SUNSHINE_JAR)

# compile the java frontend
$(LANG_ARCHIVE): $(LANG_DIR)
	cd $(LANG_DIR) && $(MAVEN) verify

# ensure the spoofax language is compiled and available
lang: $(LANG_ARCHIVE) sunshine

## Testing

# Turn a language file into its aterm representation
# using the Spoofax syntax definition
%.aterm: %.$(LANG_EXT)
	@$(PARSE) $< > $@

#%.result: %.$(LANG_EXT) src/
#	@./tests/run $< | tee $@ | grep -i "failure\|success"

test: $(TEST_ATERMS)
	@./tests/run $(SUNSHINE_JAR) $(LANG_DIR) $^

#test-results: 
#	find . -iname '*.result' -exec sh -c "cat {} | grep -i 'failure\|success'" \;

## Cleaning

test-clean:
	find -iname "*.aterm" -exec rm {} \;
	find -iname "*.result" -exec rm {} \;
	find -iname "*.out" -exec rm {} \;

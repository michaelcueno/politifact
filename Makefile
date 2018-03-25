all: 
	zip -r Archive.zip *
	echo "Good, now upload at: https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/Politifact?tab=code"

clean: 
	rm Archive.zip

test: 
	node test.js

.PHONY: docker-image docker-image-publish

docker-image:
	docker build \
		-t mikupush/docs:latest \
		-t mikupush/docs:$$(cat VERSION) \
		--platform linux/arm64,linux/amd64 . 

docker-image-publish:
	docker push mikupush/docs:latest; \
	docker push mikupush/docs:$$(cat VERSION)
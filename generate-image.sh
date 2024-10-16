#!/bin/bash

# curl --request POST \
#      --url http://localhost:8090/prompt/req \
#      --header 'accept: application/json' \
#      --header 'authorization: Bearer v1.dca7bed82d3b0e22ac4b1c6eb4978eb6da0ef27ab7288faa28e6e8385293ab43' \
#      --header 'content-type: application/json' \
#      --data '
# {
#   "style": "anything",
#   "layout": "square",
#   "amount": 4,
#   "model": "default",
#   "prompt": "a cat"
# }
# '

curl http://localhost:8090/prompt/req -H "Content-Type: application/json" -d '{"promptTxt":"a cute lama ninja, pixar style","negativePromptTxt":""}'
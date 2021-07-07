#/bin/sh env

echo -e "\n"

curl --header "Content-Type: application/json" \
  --request POST \
  --data @./data/doc_1.json \
  http://localhost/

echo -e "\n\n"

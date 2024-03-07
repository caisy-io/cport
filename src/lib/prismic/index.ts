import fetch from "node-fetch";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZTJtYWNoaW5lIiwiZGJpZCI6ImE5M3UyamEtOGMzNjIxZTItMTc4OC00MmNjLTk4MjEtYjY1Y2ZlMDA5NjllXzQiLCJkYXRlIjoxNjk4NzYzMjI1LCJkb21haW4iOiJhOTN1MmphIiwiaWF0IjoxNjk4NzYzMjI1fQ.83XSMNyHlbwQx4R1CGVaztWJXmtanhtMVNoj1BEIewY";
const endpoint = "https://customtypes.prismic.io";
const repository = "a93u2ja";

const url = "https://customtypes.prismic.io/customtypes/insert";

const generateRandomString = (length = 36) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateRandomType = () => {
  const randomId = generateRandomString();
  const randomLabel = generateRandomString();
  const randomTitleLabel = generateRandomString();

  return {
    id: randomId,
    label: randomLabel,
    repeatable: true,
    json: {
      Main: {
        title: {
          type: "StructuredText",
          config: {
            single:
              "heading1, heading2, heading3, heading4, heading5, heading6",
            label: randomTitleLabel,
          },
        },
        body: {
          type: "Slices",
          fieldset: "Slice zone",
          config: {
            labels: {},
          },
        },
      },
    },
    status: true,
  };
};

export const createRandomTypeInPrismic = async() => {
  const data = generateRandomType();
  await fetch(url, {
    method: "POST",
    headers: {
      repository: repository,
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if(response.status != 201){
        console.log(`response.status: `, response.status);
      }
        return response.text()
    })
    .then((data) => {
      if(data && data != ""){
        console.log(`data: ${data}`)
      }
    })
    .catch((error) => console.error("Error:", error));
};

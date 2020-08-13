const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "../src/content");
const dirPathPages = path.join(__dirname, "../src/pages/content");
let postList = [];
let pageList = [];

const getPosts = () => {
  fs.readdir(dirPath, (err, files) => {
    //  console.log(files.length)

    if (err) {
      return console.log("Failed to list contents of directory: " + err);
    }

    // console.log(files)

    files.forEach((file, i) => {
      let obj = {};
      let post;
      fs.readFile(`${dirPath}/${file}`, "utf8", (err, contents) => {
        // console.log(contents)

        const getMetaDataIndices = (acc, elem, i) => {
          if (/^---/.test(elem)) {
            acc.push(i);
          }
          return acc;
        };

        const parseMetaData = ({ lines, metadataIndices }) => {
          if (metadataIndices.length > 0) {
            let metaData = lines.slice(
              metadataIndices[0] + 1,
              metadataIndices[1]
            );
            metaData.forEach((line) => {
              obj[line.split(": ")[0]] = line.split(": ")[1];
            });
            // console.log(obj);
            return obj;
          }
        };

        const parseContent = ({ lines, metadataIndices }) => {
          if (metadataIndices.length > 0) {
            lines = lines.slice(metadataIndices[1] + 1, lines.length);
          }
          // console.log(lines.join("\n"))
          return lines.join("\n");
        };

        // console.log(typeof contents)

        const lines = contents.split("\n");
        // console.log(lines)

        const metadataIndices = lines.reduce(getMetaDataIndices, []);
        // console.log(metadataIndices)

        const metaData = parseMetaData({ lines, metadataIndices });

        const content = parseContent({ lines, metadataIndices });

        const date = new Date(metaData.date);
        const timeStamp = date.getTime() / 1000;
        // console.log(timeStamp)

        post = {
          id: timeStamp,
          title: metaData.title ? metaData.title : "No title given",
          author: metaData.author ? metaData.author : "No author given",
          date: metaData.date ? metaData.date : "No date given",
          content: content ? content : "No content given",
        };

        postList.push(post);

        // setTimeout(() => {
        //   console.log(postList);
        // }, 500);

        if (i === files.length - 1) {
          const sortedList = postList.sort((a, b) => {
            return a.id < b.id ? 1 : -1;
          });
          let data = JSON.stringify(sortedList);
          fs.writeFileSync("src/posts.json", data);
        }
      });
    });
  });
  return;
};

//
//

const getPages = () => {
  fs.readdir(dirPathPages, (err, files) => {
    //  console.log(files.length)

    if (err) {
      return console.log("Failed to list contents of directory: " + err);
    }

    // console.log(files)

    files.forEach((file, i) => {
      // let obj = {};
      let page;
      fs.readFile(`${dirPathPages}/${file}`, "utf8", (err, contents) => {
        // console.log(contents)

        // console.log(typeof contents)

        page = {
          content: contents
        };

        pageList.push(page);

        let data = JSON.stringify(pageList);
        fs.writeFileSync("src/pages.json", data);
      });
    });
  });
  return;
};

getPosts();

getPages();

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function TINYMC() {
  const editorRef = useRef(null);
  const [content, setContent] = useState("This is the initial content!");

  const [text, setText] = useState([]);

  // const [isSpace, setIsSpace] = useState(false);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const onEditorChange = function (a, editor) {
    // fetching the text from editor
    let editorText = editor.getContent({ format: "text" });

    // array to store the user's input
    let arr1 = [];

    // logic to check if user pressed enter key
    if (editorText.includes("\n\n")) {
      let i, j; //prev and next pointer
      // logic to get the user's input per line if enter key is pressed
      for (i = 0, j = 0; i < editorText.length; ) {
        if (editorText[i] === "\n") {
          let subStr = editorText.substring(j, i); //extracting each line of user's input from editor text
          let objRes = parseText(subStr); //parsing each line
          arr1.push(objRes);

          // logic to calculate the count of linebreak
          let k = i;
          // for(;editorText[k] === "\n"; k++);

          while (editorText[k] === "\n") {
            k++;
          }

          if (k - i > 2) {
            let nPairs = (k - i) / 2;
            let pairObj = { isLinkPresent: false, nPairs };
            arr1.push(pairObj);
          }

          i = k;
          j = i;
        } else {
          i++;
        }
      }

      let subStr = editorText.substring(j, i); //corner case: eg: editorText="abc\n\n123" - logic to extract "123"
      let objRes = parseText(subStr); //parsing each line
      arr1.push(objRes);
    } else {
      // if no enter is pressed
      let objRes = parseText(editorText); //parsing each line
      arr1.push(objRes);
    }

    setContent(a); //setting content state

    setText(arr1); //setting user input
  };

  // checking if hyperlink is present and forming result accoedingly
  const parseText = (text) => {
    let result = {}; //initial result

    if (text.indexOf("href") > 0) {
      result.isLinkPresent = true; //when user have typed hyperlink
      let arr = text.split("=");
      if (arr[1]) {
        arr = arr[1].split(">");
        if (arr.length > 0) {
          if (arr[0]) {
            let arr1 = arr[0].split("");
            arr1.splice(0, 1);
            arr1.pop();
            result.hrefValue = arr1.join("");
          }

          if (arr[1] && arr[1].split("<")[0]) {
            result.hrefTextValue = arr[1].split("<")[0];
          }
        }
      }
    } else {
      result.isLinkPresent = false; //when user have not typed hyperlink
      result.textValue = text;
    }

    // if (text === "") {
    //   setIsSpace(true);
    // }

    return result;
  };

  return (
    <>
      <div style={{ height: "400px" }}>
        {text.map((obj, index) => {
          if (obj.isLinkPresent) {
            //hyperlink is present
            return (
              <a
                key={index}
                href={obj.hrefValue}
                target="_blank"
                rel="noreferrer"
              >
                {obj.hrefTextValue}
              </a>
            );
          } else if (
            obj.isLinkPresent === false &&
            obj.hasOwnProperty("nPairs")
          ) {
            //line break use case
            let arr = [];
            for (let i = 0; i < obj.nPairs; i++) {
              let ele = React.createElement("br");
              arr.push(ele);
            }
            return React.createElement("p", { className: "linebreak" }, [arr]);
          } else {
            //normal text
            return <p key={index}>{obj.textValue}</p>;
          }
        })}
      </div>

      {/* <div style={{ height: "400px" }}>
        {text.map((obj, index) => {
          if (obj.isLinkPresent) {
            //hyperlink is present
            return (
              <>
                <a key={index} href={obj.hrefValue}>
                  {obj.hrefTextValue}
                </a>
                {isSpace ? <br /> : null}
              </>
            );
          } else {
            return (
              <>
                <span key={index}>{obj.textValue}</span>
                {isSpace ? <br /> : null}
              </>
            );
          }
        })}
      </div> */}

      <Editor
        onEditorChange={onEditorChange}
        //initialValue={content}
        //outputFormat="text"

        value={content}
        onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "mentions advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | emoticons| help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          emoticons_append: {
            custom_mind_explode: {
              keywords: ["brain", "mind", "explode", "blown"],
              char: "🤯",
            },
          },
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}

export default TINYMC;

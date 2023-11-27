import { useState, useEffect, useRef } from "react";
import { BiPlus, BiComment, BiSend } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { FcAssistant } from "react-icons/fc";
import { TbUserPentagon } from "react-icons/tb";
import "./style.css";

const sectionStyles = {
  width: "100%",
  borderTopLeftRadius: "20px",
  borderBottomLeftRadius: "20px",
};

function Flows() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [isRateLimitError, setIsRateLimitError] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const scrollToLastItem = useRef(null);

  const createNewChat = () => {
    setMessage(null);
    setText("");
    setCurrentTitle(null);
  };

  const backToHistoryPrompt = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setText("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!text) return;

    const options = {
      method: "POST",
      body: JSON.stringify({
        message: text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setIsResponseLoading(true);

      const response = await fetch("/api/chat/completions", options);
      const data = await response.json();

      if (data.error) {
        setIsRateLimitError(true);
      } else {
        setIsRateLimitError(false);
      }

      if (!data.error) {
        setMessage(data.choices[0].message);
        setTimeout(() => {
          scrollToLastItem.current?.lastElementChild?.scrollIntoView({
            behavior: "smooth",
          });
        }, 1);
        setTimeout(() => {
          setText("");
        }, 2);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsResponseLoading(false);
    }
  };

  useEffect(() => {
    if (!currentTitle && text && message) {
      setCurrentTitle(text);
    }

    if (currentTitle && text && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: text,
        },
        {
          title: currentTitle,
          role: message.role,
          content:
            message.content.charAt(0).toUpperCase() + message.content.slice(1),
        },
      ]);
    }
  }, [message, currentTitle]);

  const currentChat = previousChats.filter(
    (prevChat) => prevChat.title === currentTitle
  );
  const uniqueTitles = Array.from(
    new Set(previousChats.map((prevChat) => prevChat.title).reverse())
  );
  return (
    <>
      <div className="chatbot-container">
        {isSidebarOpen && (
          <section className="chatbot-sidebar">
            <div
              className="sidebar-header"
              onClick={createNewChat}
              role="button"
            >
              <BiPlus />
              <button className="chat-btn">New Flow</button>
            </div>
            <div className="sidebar-history">
             
              <ul className="list">
                {uniqueTitles?.map((uniqueTitle, idx) => (
                  <li
                    key={idx}
                    className="sidebar-item"
                    onClick={() => backToHistoryPrompt(uniqueTitle)}
                  >
                    <BiComment />
                    {uniqueTitle.slice(0, 18)}...
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        <section
          style={isSidebarOpen === false ? sectionStyles : {}}
          className="chatbot-main"
        >
          <div className="chatbot-titleBox">
            <FaBars
              size={22}
              onClick={() => setSidebarOpen((prevState) => !prevState)}
            />
            <h1>kylaGPT</h1>
          </div>
          <div className="main-header">
              {currentChat?.length>0 ?
            <ul className="list">
              {currentChat?.map((chatMsg, idx) => (
                <li key={idx} ref={scrollToLastItem}>
                  {chatMsg.role === "user" ? (
                    <TbUserPentagon className="chatbot-icon" />
                  ) : (
                    <FcAssistant className="chatbot-icon" />
                  )}
                  <p>{chatMsg.content}</p>
                </li>
              ))} 
            </ul>:
            <div className="body-filler">
              <div>
            <h1 >Hello, I am your personal assisstant!</h1>
            <p>Ask your Queries!</p>
            </div>
          </div>
              }
          </div>
          <div className="main-bottom">
            {isRateLimitError && (
              <p>
                Rate limit reached for default-gpt-3.5-turbo. Please try again
                in 20s.
              </p>
            )}
            <form className="form-container" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Send a message."
                spellCheck="false"
                value={
                  isResponseLoading
                    ? "Loading..."
                    : text.charAt(0).toUpperCase() + text.slice(1)
                }
                onChange={(e) => setText(e.target.value)}
                readOnly={isResponseLoading}
              />
              {!isResponseLoading && (
                <button className="chat-btn" type="submit">
                  <BiSend size={20} />
                </button>
              )}
            </form>
            <p>
              Free Research Preview. ChatGPT may produce inaccurate information
              about people, places, or facts. ChatGPT May 3 Version
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Flows;

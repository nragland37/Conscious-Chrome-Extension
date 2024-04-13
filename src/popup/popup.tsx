import React, { useEffect, useState } from "react";
import axios from "axios";
import './popup.css'
import ReactSpeedometer from "react-d3-speedometer";
const ReliabilityIndicator=({value}:{value:number})=>{
    return (
      <div className="w-[87vw] h-screen p-5  font-bold rounded-lg ">
     <div className="text-center text-9xl"> {value}</div>
     <div className="w-[95%] flex justify-end text-lg">out of 10</div>
    </div>
    );
}
const PerspectiveTextBox =({parrah}:{parrah:string})=>{
  console.log(parrah);
  return (
    <div className="w-[87vw] h-screen p-5 text-sm font-semibold rounded-lg ">
        {parrah}
      </div>
  );
}
const PropagandaMeter = ({ value}:{value:number}) => {

  return (
    <div className="mt-4">
    <ReactSpeedometer
    needleColor="black"
    textColor="black"
    width={350}
      labelFontSize="12px"
      paddingVertical={15}
      value={1000-value}
      currentValueText="Propaganda Level"
      needleTransitionDuration={2000}
      needleHeightRatio={0.7}
      customSegmentLabels={[
        {
          text: "Very High",
          // position: "INSIDE",
          color: "#000",
        },
        {
          text: "High",
          // position: "INSIDE",
          color: "#000",
        },
        {
          text: "Neutral",
          // position: "INSIDE",
          color: "#000",
        },
        {
          text: "Low",
          // position: "INSIDE",
          color: "#000",
        },
        {
          text: "Negligible",
          // position: "INSIDE",
          color: "#000",
        },
      ]}
    />
    </div>
  );
}
const Popup = () => {
  const [text, setText] = useState("");
  const [jsonresult, setjsonresult] = useState({reliability_score : "" , propaganda_rating : "", another_perspective : "" });
  async function getnews(search_prompt) {
    const newskey = "OWo8NodaT48dpueZqh12TzMzDZ02O2IpnZsiSDnS";
    const url = `https://api.thenewsapi.com/v1/news/all?api_token=OWo8NodaT48dpueZqh12TzMzDZ02O2IpnZsiSDnS&search=${encodeURIComponent(search_prompt)}`;
    console.log("newzzz", search_prompt);
    const response = await axios.get(url);

    console.log(response);
    console.log(response.data);
    console.log(response.data.data);
    const arr = response.data.data;
    let results = "";
    // ="Title: Can Elon Musk Dodge Dogecoin Investors' Insider-Trading Allegations? Snippet: A group of Dogecoin investors amended their lawsuit against Twitter and Tesla (TSLA) CEO Elon Musk, accusing him of insider trading and market manipulation of t... source: investors.com Title: Elon Musk Takes Dogecoin On A Wild Ride After He Tweets 1950s Song, Netizens Baffled Snippet: Tesla CEO Elon Musk has been a supporter of cryptocurrency and his opinion about them fluctuate their market price. Similar thing happened on May 20 as Musk twe... source: news.google.com Title: All the companies led by Elon Musk Snippet: Elon Musk is the world’s richest man. Though there are not too many companies led by Elon Musk, each of them is known for its pioneering achievements in scien... source: news.google.com";
    for (let i = 0; i < arr.length; i++) {
      results += " " + i + " Title: " + arr[i].title + " Snippet: " + arr[i].snippet + " source: " + arr[i].source;
    }
    console.log(results);
    return results;
  }
  async function search_generate(tweet) {

    let requestData = {
      messages: [
        {
          role: "system",
          content: "you are a fake news detector and you also provide another perspective or side of the story so that users get to know both sides, i will provide you with a tweet give me back a search prompt to search for news related to it so that later on when i provide you with the news you tell me whether it is fake or not and also can provide with another perspective just write the search without anything else"
        },
        { role: "user", content: "Tweet" + tweet },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 1500,
    };
    console.log("working key");
    console.log(process.env.OPEN_KEY);
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPEN_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;

  }
  async function fakedetector(news, tweet) {
    news = news.replace(/\./g, ' ');
    console.log(news);
    // return ;
    let requestData = {
      messages: [
        {
          role: "system",
          // content:"you are a fake news detector and you also provide another perspective or side of the story so that users get to know both sides , i will provide you with a tweet and give you some news related to it tell me whether the news is fake or not also give me a metric out of 10 to tell me about the reliability format should be in json ,also tell me about the propaganda rating out of 100  just 4 things in the json { reason_for_fake : reason_for_fake , reliability_score : reliability_score , propaganda_rating : propaganda_rating, another_perspective : another_perspective }"
          content: "you are a tweet analyzer , you have to do 3 things , i will provide you with a tweet and give news related to the tweet, you have to tell whether the information is reliable or not rate it out of 10 probably it will be reliable, depending on the intent and tone of the tweet give it a propaganda rating out of 1000 the more the rating the more the tweet is to manipulate other or biased, also provide a fresh another perspective so that the user can have both sides of the story , do everything in json format  {another_perspective : another_perspective , reliability_score : reliability_score , propaganda_rating : propaganda_rating }"
        },
        { role: "user", content: "Tweet " + tweet + " News " + news },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 1500,
    };
    let response;
    try {
      console.log("axios req gpt");

      response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPEN_KEY}`,
          },
        }
      );
      console.log(response);

    } catch (error) {
      console.log(error);
    }
    console.log(response?.data.choices[0].message.content);
    return response?.data.choices[0].message.content;

  }
  async function everything(tweet) {
    console.log("tweets", tweet);
    // return;
    const prompt = await search_generate(tweet);
    // it sends the tweet to the chat gpt and gets a prompt to search to get news for a certain situation
    console.log(prompt);
    // const prompt="Biden administration arms sales to Israel Gaza conflict";
    const news = await getnews(prompt);
    console.log("news", news);
    const jsonresp = await fakedetector(news, tweet);
    console.log(jsonresp);
    console.log(typeof(jsonresp));
    setjsonresult(JSON.parse(jsonresp));

  }
  const [tweettext, settweettext] = useState("");

  useEffect(() => {
    // console.log(process.env.OPEN_KEY);
    // Listen for messages from the extension
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'setText') {
        // setText(message.text);
        console.log("putting", message.text);
        const newtest=message.text.replace(/\n/g, '');
       console.log("in everything",newtest); 
       everything(newtest);
      
        
        settweettext(newtest)
      }
    });

    // Request text from the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.id !== undefined) {
        chrome.tabs.sendMessage(tab.id, { action: 'getText' });
      }
    });
    // let mystr="{another_perspective : "It is important to note that fundraising is just one aspect of a political campaign and does not necessarily translate to electoral success. There are various factors that contribute to a candidate's overall campaign strategy and performance.",reliability_score : 5,propaganda_rating : 900}"
  }, []);
  const [tab, settab] = useState("perspective");
  // console.log(object);
  return (
    <div className="  w-[95vw] h-[95vh]  flex flex-col items-center justify-start p-3 rounded-xl shadow-xl m-2 bg-white ">
      <div className="w-screen text-center text-3xl font-bold mb-2">Conscious</div>
      <div className="flex w-[82vw] items-center justify-center rounded-lg py-2 shadow-3xl bg-black mb-3">
        <div onClick={() => { settab("perspective") }} className={`cursor-pointer text-white text-sm font-semibold mr-2 text-opacity-90 rounded-lg modern  p-2  ${tab === "perspective" ? "bg-white bg-opacity-15   " : ""}`}>
          Perspective
        </div>
        <div onClick={() => { settab("propaganda") }} className={`cursor-pointer text-white text-sm font-semibold mr-2 text-opacity-90 rounded-lg  p-2 ${tab === "propaganda" ? "bg-white bg-opacity-15  " : ""}`}>
          Propaganda
        </div>
        <div onClick={() => { settab("reliability") }} className={`cursor-pointer text-white text-sm font-semibold mr-2 text-opacity-90 rounded-lg  p-2 ${tab === "reliability" ? "bg-white bg-opacity-15  " : ""}`}>
          Reliability
        </div>
      </div>
      {jsonresult.another_perspective.length===0&&
      <div className="loader mt-5">
    <div className="circle"></div>
    <div className="circle"></div>
    {/* <div className="circle"></div> */}
</div>}
      {
        tab=="perspective"&&<PerspectiveTextBox parrah={jsonresult.another_perspective} />
      }
      {
        tab=="propaganda"&&<PropagandaMeter value={Number(jsonresult.propaganda_rating)} />
      }
      {
        tab=="reliability"&&<ReliabilityIndicator value={Number(jsonresult.reliability_score)} />
      }

      

      <h1 className="text-4xl "></h1>
    </div>
  )
};

export default Popup;
import React, {useState, useEffect} from 'react';
import QuestionElement from "./QuestionElement";
import SortContainer from "./SortContainer";
import apiRequest from "./apiRequest";
import './css/questions.css'
import LoadMore from "./LoadMore";

function Main({ match }) {
  const [states, setStates] = useState({
    result: [],
    orderType: 'desc',
    sortType: 'activity',
    page: 1,
  });

  useEffect(() => {
    if (match?.params?.id) {
      apiRequest('questions', states, setStates,
        {
          'filter': '!.IzyzT1sqxXAwfdQbRAfsZkXflu7X',
          'tag': match?.params?.id,
        }
      );
    } else {
      apiRequest('questions', states, setStates,
        {
          'filter': '!.IzyzT1sqxXAwfdQbRAfsZkXflu7X',
        }
      );
    }
  }, [states.orderType, states.sortType, states.page]);

  return (
    <>
      <SortContainer
        setState={setStates}
        sortBy={["activity", "votes", "creation"]}
        orderBy={["desc", "asc"]}
      />
      {
        match?.params?.id ?
        (
          <div className="tags px-4 pt-2">
            <p key={match?.params?.id} className="tag">Tag: {match?.params?.id}</p>
          </div>
        ) : (<></>)
      }
      <div className="questions-container px-4">
        {states?.result?.map((question, index) =>
          question ? (<QuestionElement key={index} question={question} />) : null
        )}
      </div>
      <LoadMore value={states} setValue={setStates} />
    </>
  )
}

export default Main;
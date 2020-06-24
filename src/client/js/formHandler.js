const url = `http://localhost:8083/`;
 
const handleSubmit = (event) =>{
  event.preventDefault();
  // get value from input
  let text = document.getElementById("name").value;
  const dataToSend = {
    text: text
  }
  postText(url,dataToSend) 
}

const handleRefresh = (event) =>{
  event.preventDefault()
  
  getSentiment(url).then((data) => {
    updateUI(data.polarity, data.subjectivity, data.polarity_confidence, data.subjectivity.confidence)
  })
}

const postText = async (url,dataToSend) => {
  const res = await fetch(`${url}sentiment`,{
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(dataToSend)
  });
  try{
    return res
  }
  catch (err) {
    return err
  }
}

const getSentiment = async(url) => {
  const res = await fetch(`${url}sentiment`)
  
  try{ 
    const data = await res.json() 
    return data
  }
  catch (err) {
    return err
  }
}

const updateUI = (polar, subject, polar_confi, subject_confi) => {
  let polar_node = document.getElementById("polarity");
  let subject_node = document.getElementById("subjectivity");
  let polarConfi_node= document.getElementById("polarity_confidence");
  let subjectConfi_node = document.getElementById("subjectivity_confidence");

  polar_node.innerHTML=`<label>Polarity: </label><p class="text-result">${polar} </p>`
  subject_node.innerHTML=`<label>Subjectivity: </label><p class="text-result">${subject}</p>`
  polarConfi_node.innerHTML=`<label>Polarity Confidence: </label><p class="text-result">${polar_confi}</p>`
  subjectConfi_node.innerHTML=`<label>Subjectivity Confidence: </label><p class="text-result">${subject_confi}</p>`

  
} 


export{ 
  handleSubmit,
  handleRefresh
}
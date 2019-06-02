function createWarningContent(num) {
  const warning = document.createElement('p');
  warning.classList.add('warning-text');
  if (num === 'email') {
    warning.innerText = '請輸入有效的電子郵件地址';
  } else {
    warning.innerText = '這是必填問題';
  }
  return warning;
}

function removeWarning(region, formName) {
  region.classList.remove('warning-bg');
  const warningText = `${formName} p`;
  region.removeChild(document.querySelector(warningText));
}

function addWarning(region, warning) {
  region.classList.add('warning-bg');
  region.appendChild(warning);
}

function checkEmailRegion() {
  const emailInputElementValue = document.querySelector('.form__email input').value;
  const check1 = emailInputElementValue.indexOf('@');
  const check2 = emailInputElementValue.indexOf('.com');
  const emailRegion = document.querySelector('.form__email');
  const warning = createWarningContent('email');
  const warningGeneral = createWarningContent('general');
  if (emailInputElementValue === '' && !emailRegion.classList.contains('warning-bg')) {
    addWarning(emailRegion, warningGeneral);
    emailRegion.classList.add('warning-bg');
    document.querySelector('.form__email input').classList.add('warning-input');
  }
  if ((check1 === -1 || check2 === -1) && !emailRegion.classList.contains('warning-bg')) {
    addWarning(emailRegion, warning);
    document.querySelector('.form__email input').classList.add('warning-input');
  }
  if (!(emailInputElementValue === '') && check1 >= 1 && check2 >= 2 && emailRegion.classList.contains('warning-bg')) {
    removeWarning(emailRegion, '.form__email');
    document.querySelector('.form__email input').classList.remove('warning-input');
  }
  return emailInputElementValue;
}

function checkRadioRegion() {
  const selectorAll = document.querySelectorAll('.form__applyType-option');
  const region = document.querySelector('.form__applyType');
  const warning = createWarningContent('general');
  if (!(selectorAll[0].checked) && !(selectorAll[1].checked) && !region.classList.contains('warning-bg')) {
    addWarning(region, warning);
  }
  if (selectorAll[0].checked && region.classList.contains('warning-bg')) {
    removeWarning(region, '.form__applyType');
  }
  if (selectorAll[1].checked && region.classList.contains('warning-bg')) {
    removeWarning(region, '.form__applyType');
  }
  const innerTextAll = document.querySelectorAll('.form__applyType label');
  if (selectorAll[0].checked) {
    return innerTextAll[0].innerText;
  }
  return innerTextAll[1].innerText;
}

function checkInputRegion(formName, formNameInput) {
  const inputElementValue = document.querySelector(formNameInput).value;
  const region = document.querySelector(formName);
  const regionInput = document.querySelector(formNameInput);
  const warning = createWarningContent('general');
  if (inputElementValue === '' && !region.classList.contains('warning-bg')) {
    addWarning(region, warning);
    regionInput.classList.add('warning-input');
  }
  if (!(inputElementValue === '') && region.classList.contains('warning-bg')) {
    removeWarning(region, formName);
    regionInput.classList.remove('warning-input');
  }
  return inputElementValue;
}

document.querySelector('.form__button').addEventListener('click',
  () => {
    const emailValue = checkEmailRegion();
    const nickNameValue = checkInputRegion('.form__nickName', '.form__nickName input');
    const applyType = checkRadioRegion();
    const job = checkInputRegion('.form__job', '.form__job input');
    const howToKnowThisPlan = checkInputRegion('.form__howToKnow', '.form__howToKnow input');
    const otherCodeKnowledge = checkInputRegion('.form__learningCode', '.form__learningCode input');
    const otherValue = document.querySelector('.form__other input').value;
    const checkWarning = document.querySelector('.warning-input');
    if (!checkWarning) {
      console.log('電子郵件：', emailValue);
      console.log('暱稱：', nickNameValue);
      console.log('報名類型：', applyType);
      console.log('現在的職業：', job);
      console.log('怎麼知道這個計畫的：', howToKnowThisPlan);
      console.log('是否有程式相關背景：', otherCodeKnowledge);
      console.log('其他：', otherValue);
      console.log('-------------'); // 區分用
      alert('提交成功');
    } else {
      window.scroll(0, 0);
    }
  });

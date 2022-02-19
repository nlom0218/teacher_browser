import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  div {
    justify-self: flex-end;
    padding: 0px 10px;
    padding: 0rem 0.625rem;
  }
`

const TimeInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  box-sizing: border-box;
  border-radius: 5px;
  border-radius: 0.3125rem;
  border: ${props => props.isEdit && `${props.theme.fontColor} 1px solid`};
  background-color: ${props => props.theme.originBgColor};
`

const TimeSettingLayout = ({ register }) => {
  return (<React.Fragment>
    <Layout>
      <TimeInput
        {...register("hours", { required: true })}
        type="number"
        min="0"
      />
      <div>시간</div>
    </Layout>
    <Layout>
      <TimeInput
        {...register("minutes", { required: true })}
        type="number"
        min="0"
        max="59"
      />
      <div>분</div>
    </Layout>
    <Layout>
      <TimeInput
        {...register("seconds", { required: true })}
        type="number"
        min="0"
        max="59"
      />
      <div>초</div>
    </Layout>
  </React.Fragment>);
}

export default TimeSettingLayout;
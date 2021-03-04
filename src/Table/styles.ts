import styled, { css } from 'styled-components';

// interface ContainerProps {
//   type: 'concluido' | 'pendente' | 'cancelado';
// }

// const toastTypeVariations = {
//   concluido: css`
//     background: #15ab52;
//     color: #fff;
//   `,
//   pendente: css`
//     background: #e5d00e;
//     color: #fff;
//   `,
//   cancelado: css`
//     background: #eb5b52;
//     color: #fff;
//   `,
// };

export const Container = styled.div`
  width: 80%;
  min-width: 700px;
  margin: 0 auto;

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 14px;
    font-family: 'Roboto';

    td {
      padding: 20px 6px;

      &:nth-child(9) {
        text-align: center;
      }
    }
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 72px;
  height: 40px;
  padding: 0 4px;
  margin-top: 12px;

 
`;
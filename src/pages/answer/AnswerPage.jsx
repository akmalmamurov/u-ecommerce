import { Box, Container } from "@chakra-ui/react";
import "./AnswerPage.scss";
import theme from "../../theme";
import { Link } from "react-router-dom";
import { faqData } from "../../constants";
const AnswerPage = () => {
  return (
    <Box fontFamily={theme.fonts.fInter} className="answer-page">
      <Container maxW={"1200px"}>
        <div className="answer-content">
          <div className="answer-left">
            <h1 className="answer-title">Вопрос-Ответ</h1>
            {Object.entries(faqData).map(([title, questions]) => (
              <div className="answer-list" key={title}>
                <h2 className="answer-list_title">{title}</h2>
                {questions.map((question, index) => (
                  <div className="answer-list_item" key={index}>
                    <Link className="answer-list_link" >
                      {question}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="answer-right">
                  <div className="answer-right_item" id="register">
                      <h1 className="">Регистрация</h1>
                  </div>
            </div>
        </div>
      </Container>
    </Box>
  );
};

export default AnswerPage;

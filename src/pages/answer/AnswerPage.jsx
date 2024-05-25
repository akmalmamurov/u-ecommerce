import { Box, Container, Heading, Text } from "@chakra-ui/react";
import "./AnswerPage.scss";
import theme from "../../theme";
import { Link } from "react-router-dom";
import { faqData } from "../../constants";
const AnswerPage = () => {
  return (
    <Box fontFamily={theme.fonts.fInter} className="faq-page">
      <Container maxW={"1200px"}>
        <div className="faq-header">
          <h1 className="faq-title">Вопрос-Ответ</h1>
        </div>
        <div className="faq-content">
          <div className="faq-left">
            {Object.entries(faqData).map(([title, questions]) => (
              <div className="faq-list" key={title}>
                <h2 className="faq-list_title">{title}</h2>
                {questions.map((question, index) => (
                  <div className="faq-list_item" key={index}>
                    <Link className="faq-list_link">{question}</Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="faq-right">
            <div className="faq-right_item" id="register">
              <div className="faq-text_content">
                <h1 className="faq-right_title">Регистрация</h1>
                <p className="faq-right_text">
                  Регистрация аккаунта необходима для оформления и оплаты
                  заказов. Благодаря ей вам не потребуется постоянно заполнять
                  данные при оформлении заказа. Регистрация займет не более трех
                  минут.
                </p>
              </div>
              <div className="faq-text_content">
                <h1 className="faq-right_title">
                  Как зарегистрироваться в приложении?
                </h1>
                <p className="faq-right_text">
                  Cкачайте приложение UlabMarket:
                </p>
                <p className="faq-right_text">- в App Store: Voltify</p>
                <Text mb={"10px"} className="faq-right_text">
                  - в Play Market: Voltify
                </Text>
                <Text mb={"10px"} className="faq-right_text">
                  Зайдите в приложение, нажмите «Войти». Затем введите ваш номер
                  телефона и нажмите «Получить код». Вам поступит СМС с
                  6-значным кодом, после введения которого вы перейдете в личный
                  кабинет.
                </Text>
                <Text className="faq-right_text">
                  Далее нажмите на значок шестеренки⚙️в правом верхнем углу и
                  заполните личные данные:
                </Text>
                <Text className="faq-right_text">- ФИО;</Text>
                <Text className="faq-right_text">- номер телефона;</Text>
                <Text className="faq-right_text">
                  - электронную почту (при желании);
                </Text>
                <Text className="faq-right_text">- дату рождения;</Text>
                <Text className="faq-right_text">- и пол</Text>
                <Text className="faq-right_text">
                  Чтобы выйти из личного кабинета, зайдите в кабинет,
                  пролистайте страницу вниз и нажмите на кнопку «Выйти»
                </Text>
                <h3 className="faq-right_title">
                  Как зарегистрироваться на сайте?
                </h3>
                <Text mb={"10px"} className="faq-right_text">
                  Зайдите на наш сайт. В верхнем правом углу вы увидите кнопку
                  «Войти». Нажмите на нее, а затем в открывшемся окне введите
                  ваш номер телефона и далее нажмите кнопку «Получить код». Вам
                  поступит СМС с 4- значным кодом, после введения которого вы
                  перейдете в личный кабине
                </Text>
                <Text className="faq-right_text">
                  Далее выберите слева раздел «Настройки» и введите личные
                  данные:
                </Text>
                <Text className="faq-right_text">- ФИО;</Text>
                <Text className="faq-right_text">- номер телефона;</Text>
                <Text className="faq-right_text">- электронную почту;</Text>
                <Text className="faq-right_text">- пол;</Text>
                <Text mb={"10px"} className="faq-right_text">
                  - и дату рождения, и нажмите кнопку «Сохранить».
                </Text>
                <Text className="faq-right_text">
                  Чтобы выйти из личного кабинета, выберите справа кнопку с
                  указанием вашего имени (рядом будет отображаться фигура
                  человека), а затем выберите слева раздел «Настройки» и снизу
                  нажмите «Выйти из системы».
                </Text>
              </div>
            </div>
            <div className="faq-right_item">
              <div className="faq-text_content" id="delivery">
                <Heading as={"h3"} mb={"10px"} className="faq-right_title">
                  Доставка
                </Heading>
                <Heading as={"h3"} className="faq-right_title">
                  Какие есть способы доставки?
                </Heading>
                <Text mb={"10px"} className="faq-right_text">
                  Доставка до пункта выдачи заказов: стоимость доставки до
                  пункта выдачи Voltify отобразится при оформлении заказа. Также
                  доставка будет бесплатной, если вы оформите заказ на
                  необходимую сумму, указанную при оформлении заказа.
                </Text>
                <Text className="faq-right_text">
                  Курьерская доставка: доставка курьером стоит 30 000 сум, но
                  если сумма заказа будет выше 1 000 000 сум, заказ привезут
                  бесплатно в любую доступную точку города, в котором открыт наш
                  пункт выдачи.
                </Text>
                <Heading as={"h3"} className="faq-right_title">
                  Как изменить адрес курьерской доставки?
                </Heading>
                <Text className="faq-right_text">
                  Свяжитесь с нами до 9:00 утра в день доставки, и мы проверим
                  возможность изменения адреса, по которому курьер привезет
                  заказ. Если вы обратитесь после 9:00 утра, доставка на новый
                  адрес перенесется на следующий день и будет по новому адресу.
                  В обоих случаях свяжитесь с нашей службой поддержки.
                </Text>
                <Heading as={"h3"} className="faq-right_title">
                  Как изменить дату курьерской доставки?
                </Heading>
                <Text className="faq-right_text">
                  Мы можем перенести ее на несколько дней вперед. Для этого
                  свяжитесь с нашей службой поддержки. Как изменить номер
                  телефона, указанный для курьерской доставки? Свяжитесь с
                  нашей службой поддержки и сообщите свой актуальный номер, по
                  которому курьер сможет согласовать доставку.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default AnswerPage;

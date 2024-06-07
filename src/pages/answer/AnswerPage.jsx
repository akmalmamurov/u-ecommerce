import { Link } from "react-router-dom";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { faqData } from "constants";
import theme from "theme";
import "./AnswerPage.scss";
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
                <p className="faq-right_text faq-nomb">
                  Cкачайте приложение UlabMarket:
                </p>
                <p className="faq-right_text faq-nomb">
                  - в App Store: Voltify
                </p>
                <Text className="faq-right_text ">
                  - в Play Market: Voltify
                </Text>
                <Text className="faq-right_text ">
                  Зайдите в приложение, нажмите «Войти». Затем введите ваш номер
                  телефона и нажмите «Получить код». Вам поступит СМС с
                  6-значным кодом, после введения которого вы перейдете в личный
                  кабинет.
                </Text>
                <Text className="faq-right_text faq-nomb">
                  Далее нажмите на значок шестеренки⚙️в правом верхнем углу и
                  заполните личные данные:
                </Text>
                <Text className="faq-right_text faq-nomb">- ФИО;</Text>
                <Text className="faq-right_text faq-nomb">
                  - номер телефона;
                </Text>

                <Text className="faq-right_text">
                  Чтобы выйти из личного кабинета, зайдите в кабинет,
                  пролистайте страницу вниз и нажмите на кнопку «Выйти»
                </Text>
              </div>
              <div className="faq-text_content">
                <h1 className="faq-right_title">
                  Как зарегистрироваться на сайте?
                </h1>
                <Text className="faq-right_text ">
                  Зайдите на наш сайт. В верхнем правом углу вы увидите кнопку
                  «Войти». Нажмите на нее, а затем в открывшемся окне введите
                  ваш номер телефона и далее нажмите кнопку «Получить код». Вам
                  поступит СМС с 5- значным кодом, после введения которого вы
                  перейдете в личный кабинет.
                </Text>
                <Text className="faq-right_text faq-nomb">
                  Далее выберите слева раздел «Настройки» и введите личные
                  данные:
                </Text>
                <Text className="faq-right_text faq-nomb">- ФИО;</Text>
                <Text className="faq-right_text faq-nomb">
                  - номер телефона;
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
                <Heading
                  as={"h3"}
                  mb={"24px"}
                  className="faq-right_title faq-mb24"
                >
                  Доставка
                </Heading>
                <Heading as={"h3"} className="faq-right_title">
                  Какие есть способы доставки?
                </Heading>
                <Text className="faq-right_text">
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
                  телефона, указанный для курьерской доставки? Свяжитесь с нашей
                  службой поддержки и сообщите свой актуальный номер, по
                  которому курьер сможет согласовать доставку.
                </Text>
              </div>
            </div>
            <div className="faq-right_item" id="delivery">
              <div className="faq-text_content">
                <Heading
                  as={"h3"}
                  mb={"24px"}
                  className="faq-right_title faq-mb24"
                >
                  Оформление заказа
                </Heading>
                <Heading as={"h3"} className="faq-right_title">
                  Как заказать?
                </Heading>
                <p className="faq-right_text faq-nomb ">
                  1. Добавьте товары в корзину.
                </p>
                <p className="faq-right_text faq-nomb ">
                  2. Проверьте количество и характеристики товара: например,
                  размер и цвет.
                </p>
                <p className="faq-right_text faq-nomb ">
                  3. Нажмите «Оформить».
                </p>
                <p className="faq-right_text faq-nomb ">
                  4. В разделе оформления заказа укажите способ доставки — в
                  пункт выдачи или курьером.
                </p>
                <p className="faq-right_text faq-nomb ">
                  5. Введите и проверьте данные о получателе заказа*. Почему это
                  важно? Потому что на номер телефона{" "}
                  <span>
                    придет код выдачи заказа. Имя и фамилия понадобятся для
                    сверки с паспортом, если вы заказали товар с
                  </span>
                  <span>
                    {" "}
                    возрастным ограничением или использовали промокод.
                  </span>
                </p>
                <p className="faq-right_text faq-nomb ">
                  6. Введите промокод, если он есть. Актуальные промокоды можно
                  найти на сайт в наших соцсетях, пуш-{" "}
                  <span>уведомлениях или СМС.</span>
                </p>
                <p className="faq-right_text faq-nomb">
                  7. Выберите удобный для вас способ оплаты:
                </p>
                <p className="faq-right_text faq-nomb">
                  <span>- оплатите онлайн: картой Uzcard, Humo;</span>
                </p>
                <p className="faq-right_text faq-nomb">
                  <span>
                    - оплатите при получении наличными или картой Uzcard, Humo.
                  </span>
                </p>
                <p className="faq-right_text faq-nomb ">
                  8. Если решите оплатить онлайн заказ, или оформить рассрочку
                  позже, заказ будет зарезервирован на 30{" "}
                  <span>
                    {" "}
                    минут. Более подробно в разделе: Как работает резерв заказа
                    и промокода?
                  </span>
                </p>
                <p className="faq-right_text faq-nomb ">
                  9. При оплате заказа онлайн картой или в рассрочку, чек об
                  оплате появится в личном кабинете под{" "}
                  <span>
                    заказом, после получения заказа — «Электронный чек».
                  </span>
                </p>
                <p className="faq-right_text faq-nomb">
                  <span>Электронный чек покупки:</span>
                </p>
                <p className="faq-right_text faq-nomb">
                  <span>
                    - при онлайн-оплате электронный чек покупки будет доступен
                    после получения заказа в приложении под{" "}
                    <span> номером заказа;</span>
                  </span>
                </p>
                <p className="faq-right_text faq-nomb">
                  <span>
                    - при оплате заказа в рассрочку электронный чек покупки
                    будет доступен после получения заказа и{" "}
                    <span>
                      активации договора в приложении под номером заказа;
                    </span>
                  </span>
                </p>
                <p className="faq-right_text faq-nomb">
                  <span>
                    - при оплате через Fast Pay/QR-pass электронный чек покупки
                    будет доступен после получения заказа в{" "}
                    <span>приложении под номером заказа;</span>
                  </span>
                </p>
                <p className="faq-right_text faq-nomb">
                  <span>
                    - при оплате заказа при получении электронный чек покупки в
                    приложении отображаться не будет, так{" "}
                    <span>как на месте выдается бумажный чек.</span>
                  </span>
                </p>
                <p className="faq-right_text faq-nomb ">
                  Чтобы посмотреть, как оформить заказ быстро и удобно, нажмите.
                </p>
              </div>
              <div className="faq-text_content">
                <h1 className="faq-right_title">
                  Как добавить или удалить товар из оформленного заказа?
                </h1>
                <p className="faq-right_text faq-nomb">
                  Мы собираем и отправляем заказы очень быстро — между
                  оформлением и началом сборки вашего заказа проходит всего пара
                  минут. Поэтому мы технически не можем добавлять или удалять
                  товары из оформленного заказа
                </p>
                <p className="faq-right_text">
                  Если вы хотите дозаказать товары, оформите их отдельно и
                  заберите вместе с первым заказом. Если хотите удалить —
                  откажитесь от ненужных при получении заказа.
                </p>
              </div>
              <div className="faq-text_content">
                <h1 className="faq-right_title">Сколько хранится заказ?</h1>
                <p className="faq-right_text faq-nomb">
                  5 календарных дней в пункте выдачи с момента поступления. Если
                  вы не успеваете забрать заказ, свяжитесь с нашей службой
                  поддержки. Мы продлим срок хранения до 12 дней с даты
                  оформления заказа.
                </p>
              </div>
              <div className="faq-text_content">
                <h1 className="faq-right_title">
                  Как отменить оформленный заказ?
                </h1>
                <p className="faq-right_text faq-nomb">
                  Мы очень быстро собираем и отправляем заказы, поэтому отменить
                  заказ в системе можно только в течение 5 минут с момента его
                  оформления. По истечении 5 минут заказ можем отменить только
                  после его поступления в пункт выдачи или в город назначения.
                  Свяжитесь с нашей службой поддержки для уточнения возможности
                  отмены заказа.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default AnswerPage;

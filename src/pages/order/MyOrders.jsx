import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import "./MyOrders.scss";
import { useGetMyOrderQuery } from "../../redux/services/orderServices";
import theme from "../../theme";
import Loading from "../../components/loading/Loading";
import { kFormatter } from "../../utils";
import { format } from "date-fns";
import { useState } from "react";
const MyOrders = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMyOrderQuery({ page });
  const { data: orders } = data || {};
  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <div className="my-orders_page">
      <Container maxW={"1200px"}>
        <Box className="my-orders_content" fontFamily={theme.fonts.fInter}>
          <div className="my-orders_left">
            <h1 className="my-orders_title">Мои заказы</h1>
          </div>
          <div className="my-orders_right">
            <Tabs variant="unstyled" className="my-orders_tabs">
              <TabList className="my-orders_tabs-list">
                <Tab className="my-orders_tabs-content">Все заказы</Tab>
              </TabList>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {orders.map((item) => (
                    <TabPanels key={item.id} className="my-orders_tabs-panels">
                      <TabPanel
                        key={item.id}
                        className="my-orders_tabs-panel all-order"
                      >
                        <div className="my-orders_tab-header">
                          <h1 className="my-orders_tab-title">
                            ID Заказа <span>{item.order_id}</span>
                          </h1>
                        </div>
                        <div className="my-orders_tab-divider" />
                        <div className="my-orders_tab-body">
                          <div className="order-item">
                            <div className="order-item_left">
                              <p className="order-item_title order-item_title-status">
                                Статус:
                              </p>
                            </div>
                            <div className="order-item_right">
                              <p className="order-item_text order-item_text-status">
                                {item.status_id === 1 ? "Собирается" : ""}
                                {item.status_id === 3 ? "Доставляется" : ""}
                                {item.status_id === 4 ? "Собирается" : ""}
                                {item.status_id === 5 ? "Завершен" : ""}
                                {item.status_id === 6 ? "Отменено" : ""}
                              </p>
                            </div>
                          </div>
                          <div className="order-item">
                            <div className="order-item_left">
                              <p className="order-item_title">Дата заказа:</p>
                            </div>
                            <div className="order-item_right">
                              <p className="order-item_text">
                                {format(
                                  new Date(item.created_at),
                                  "dd.MM.yyyy"
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="order-item">
                            <div className="order-item_left">
                              <p className="order-item_title">Сумма заказа:</p>
                            </div>
                            <div className="order-item_right">
                              <p className="order-item_text">
                                {kFormatter(item.total_price)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="my-orders_tab-divider" />
                        <div className="my-orders_footer">
                          <Accordion
                            allowMultiple
                            className="order-product_accordion"
                          >
                            <AccordionItem className="order-product_accordion-item">
                              <h2>
                                <AccordionButton className="order-product_accordion-button">
                                  <Box as="span" flex="1" textAlign="left">
                                    <h1 className="order-product_title">
                                      {item.products.length} товар
                                    </h1>
                                  </Box>
                                  <AccordionIcon />
                                </AccordionButton>
                              </h2>
                              <AccordionPanel
                                pb={4}
                                className="order-product_accordion-panel"
                              >
                                {item.products.map((el) => (
                                  <div
                                    key={el.id}
                                    className="order-product_content"
                                  >
                                    <div className="order-product_image">
                                      <img
                                        src={el.main_image}
                                        className="order-product_img"
                                      />
                                    </div>
                                    <div className="order-product_info">
                                      <p className="order-product_title">
                                        {el.name_ru}
                                      </p>
                                      <p className="order-product_price">
                                        {kFormatter(el.total_price)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </AccordionPanel>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </TabPanel>
                    </TabPanels>
                  ))}
                </>
              )}
            </Tabs>
          </div>
        </Box>
        <div className="my-order_pagination">
          <Button
            isLoading={isLoading}
            onClick={handlePreviousPage}
            isDisabled={page === 1}
          >
            Previous
          </Button>
          <span>Page {page}</span>
          <Button
            isLoading={isLoading}
            onClick={handleNextPage}
            isDisabled={orders?.length < 10}
          >
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default MyOrders;

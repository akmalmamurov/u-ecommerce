import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
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
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { kFormatter } from "../../utils";

const MyOrders = () => {
  const { data, isLoading } = useGetMyOrderQuery();
  const { count, status_code, data: orders } = data || {};

  console.log(orders);
  return (
    <div className="my-orders_page">
      <Container maxW={"1200px"}>
        <Box className="my-orders_content" fontFamily={theme.fonts.fInter}>
          <div className="my-orders_left">
            <h1 className="my-orders_title">Мои заказы</h1>
            <Link to={"/profile"} className="my-orders_link">
              Настройки
            </Link>
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
                            ID Заказа {item.order_id}
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
                                {item.status}
                              </p>
                            </div>
                          </div>
                          <div className="order-item">
                            <div className="order-item_left">
                              <p className="order-item_title">Дата заказа:</p>
                            </div>
                            <div className="order-item_right">
                              <p className="order-item_text">
                                {item.created_at}
                              </p>
                            </div>
                          </div>
                          <div className="order-item">
                            <div className="order-item_left">
                              <p className="order-item_title">Дата доставки:</p>
                            </div>
                            <div className="order-item_right">
                              <p className="order-item_text">
                                {item.created_at}
                              </p>
                            </div>
                          </div>
                          <div className="order-item">
                            <div className="order-item_left">
                              <p className="order-item_title">Пункт выдачи:</p>
                            </div>
                            <div className="order-item_right">
                              <p className="order-item_text">
                                {" "}
                                {item.delivery_addr_name}
                              </p>
                            </div>
                          </div>
                          <div className="order-item">
                            <div className="order-item_left">
                              <p className="order-item_title">Часы работы:</p>
                            </div>
                            <div className="order-item_right">
                              <p className="order-item_text">10:00 - 20:00</p>
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
                          <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                              <h2>
                                <AccordionButton>
                                  <Box as="span" flex="1" textAlign="left">
                                    Section 1 title
                                  </Box>
                                  <AccordionIcon />
                                </AccordionButton>
                              </h2>
                              <AccordionPanel pb={4}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
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
      </Container>
    </div>
  );
};

export default MyOrders;

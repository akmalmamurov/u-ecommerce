import {
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
            <Link className="my-orders_link">Настройки</Link>
          </div>
          <div className="my-orders_right">
            <Tabs variant="unstyled" className="my-orders_tabs">
              <TabList className="my-orders_tabs-list">
                <Tab className="my-orders_tabs-content">Все заказы</Tab>
                <Tab className="my-orders_tabs-content">Неоплаченные</Tab>
                <Tab className="my-orders_tabs-content">Активные</Tab>
              </TabList>
              <TabPanels className="my-orders_tabs-panels">
                <TabPanel className="my-orders_tabs-panel">
                  {isLoading ? (
                    <Loading/>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="my-orders_tab-header">
                        <h1 className="my-orders_tab-header-title">
                          ID Заказа {order.order_id}
                        </h1>
                      </div>
                    ))
                  )}
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default MyOrders;

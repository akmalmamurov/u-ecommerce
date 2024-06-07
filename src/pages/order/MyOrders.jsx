import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Tab, TabList, Tabs } from "@chakra-ui/react";

import { useGetMyOrderQuery } from "../../redux/services/orderServices";
import OrderLoader from "components/loader/order-loader/OrderLoader";
import MyOrdersTab from "./MyOrders-tab/MyOrdersTab";
import theme from "theme";
import "./MyOrders.scss";

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMyOrderQuery({ page });
  const { data: orders, count } = data || {};
  const itemsPerPage = 10;
  const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

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
                <OrderLoader />
              ) : (
                <>
                  {orders?.map((item) => (
                    <MyOrdersTab key={item.id} {...item} />
                  ))}
                </>
              )}
            </Tabs>
          </div>
        </Box>
        <div className="my-order_pagination">
          <Button
            className="my-order_slide-btn"
            isLoading={isLoading}
            onClick={handlePreviousPage}
            isDisabled={page === 1}
          >
            <ChevronLeftIcon />
          </Button>
          {totalPages > 0 &&
            Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <Button
                fontFamily={theme.fonts.fInter}
                className="my-order_pagination-num_btn"
                key={num}
                onClick={() => handlePageChange(num)}
                isActive={num === page}
              >
                {num}
              </Button>
            ))}
          <Button
            className="my-order_slide-btn"
            isLoading={isLoading}
            onClick={handleNextPage}
            isDisabled={page === totalPages}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default MyOrders;

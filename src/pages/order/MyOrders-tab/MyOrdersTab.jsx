import { format } from "date-fns";
import PropTypes from "prop-types";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, TabPanel, TabPanels, } from "@chakra-ui/react";

import { kFormatter } from "utils";
import "./MyOrdersTab.scss";
const MyOrdersTab = ({ products, order_id, status_id, created_at, total_price, }) => {
  return (
    <TabPanels className="my-orders_tabs-panels">
      <TabPanel className="my-orders_tabs-panel all-order">
        <div className="my-orders_tab-header">
          <h1 className="my-orders_tab-title">
            ID Заказа <span>{order_id}</span>
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
                {status_id === 1 ? "Собирается" : ""}
                {status_id === 3 ? "Доставляется" : ""}
                {status_id === 4 ? "Собирается" : ""}
                {status_id === 5 ? "Завершен" : ""}
                {status_id === 6 ? "Отменено" : ""}
              </p>
            </div>
          </div>
          <div className="order-item">
            <div className="order-item_left">
              <p className="order-item_title">Дата заказа:</p>
            </div>
            <div className="order-item_right">
              <p className="order-item_text">
                {format(new Date(created_at), "dd.MM.yyyy")}
              </p>
            </div>
          </div>

          <div className="order-item">
            <div className="order-item_left">
              <p className="order-item_title">Сумма заказа:</p>
            </div>
            <div className="order-item_right">
              <p className="order-item_text">{kFormatter(total_price)}</p>
            </div>
          </div>
        </div>
        <div className="my-orders_tab-divider" />
        <div className="my-orders_footer">
          <Accordion allowMultiple className="order-product_accordion">
            <AccordionItem className="order-product_accordion-item">
              <h2>
                <AccordionButton className="order-product_accordion-button">
                  <Box as="span" flex="1" textAlign="left">
                    <h1 className="order-product_title">
                      {products.length} товар
                    </h1>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="order-product_accordion-panel">
                {products.map((el, index) => (
                  <div key={index} className="order-product_content">
                    <div className="order-product_image">
                      <img src={el.main_image} className="order-product_img" />
                    </div>
                    <div className="order-product_info">
                      <p className="order-product_title">{el.name_ru}</p>
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
  );
};

MyOrdersTab.propTypes = {
  products: PropTypes.array,
  order_id: PropTypes.string,
  main_image: PropTypes.string,
  id: PropTypes.string,
  status_id: PropTypes.number,
  created_at: PropTypes.string,
  total_price: PropTypes.number,
};

export default MyOrdersTab;

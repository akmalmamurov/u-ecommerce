import { Box, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import "./CheckoutDelivery.scss";
const CheckoutDelivery = () => {
  return (
    <div className="checkout-delivery_page">
      <Box className="checkout-page_title">
        <span>3</span>
        Способ получения
      </Box>
      <Box className="checkout-left_bottom">
        <RadioGroup value="delivery" mb={"28px"}>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            className="checkout-radio"
            defaultValue={"delivery"}
          >
            <Radio value="delivery">Доставка</Radio>
            <Radio value="pickup" isDisabled>
              Самовывоз из магазина
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </div>
  );
};

export default CheckoutDelivery;

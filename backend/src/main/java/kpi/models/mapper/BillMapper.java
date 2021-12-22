package kpi.models.mapper;

import kpi.models.Bill;
import kpi.models.dto.BillDto;
import org.springframework.stereotype.Component;

@Component
public class BillMapper {
    public BillDto getBillDto(Bill bill) {
        BillDto billDto = new BillDto();
        billDto.setUser(bill.getUser());
        billDto.setAmountOfMoney(bill.getAmountOfMoney());
        billDto.setId(bill.getId());
        return billDto;
    }

    public Bill getBill(BillDto billDto) {
        Bill bill = new Bill();
        bill.setUser(billDto.getUser());
        bill.setId(billDto.getId());
        bill.setAmountOfMoney(billDto.getAmountOfMoney());
        return bill;
    }
}

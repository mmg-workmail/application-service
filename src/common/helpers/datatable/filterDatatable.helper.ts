import { Equal, Like } from "typeorm";
import { DatatableDto } from "../../dto/datatable.dto";
import { Operator, QueryParam } from "../../interfaces/datatable.interface";

export class FilterDatatable {
    private datatableDto: DatatableDto;
    private query : QueryParam;

    constructor(datatableDto : DatatableDto) {
        this.datatableDto = datatableDto;

        // initial query
        this.query = {
            skip : 1,
            take: 10,
            order : {},
            where: {} 
        }
    }

    setQuery() {
        this.setSkip();
        this.setTake();
        this.setOrder();
        this.setCondition();
    }
    getQuery() {
        return this.query
    }
    private setSkip() {
        this.query.skip = this.datatableDto.page > 0 ? (this.datatableDto.page - 1) * this.datatableDto.limit : 0
    }
    private setTake() {
        this.query.take = this.datatableDto.limit
    }
    private setOrder() {
        this.query.order = {
            [this.datatableDto.orderBy]: this.datatableDto.orderType
        }
    }

    setCondition() {
        const fields = this.datatableDto.filters || []
        if (fields) {
            for (let i = 0; i < fields.length; i++) {
                switch(fields[i].operator) { 
                    case Operator.EQUAL: { 
                       this.query.where[fields[i].name] = Equal(fields[i].value)
                       break; 
                    } 
                    case Operator.LIKE: { 
                        this.query.where[fields[i].name] =Like('%' + fields[i].value + '%')
                       break; 
                    } 
                    default: { 
                        this.query.where[fields[i].name] = Equal(fields[i].value)
                       break; 
                    } 
                 }
            }
        }
    }
}
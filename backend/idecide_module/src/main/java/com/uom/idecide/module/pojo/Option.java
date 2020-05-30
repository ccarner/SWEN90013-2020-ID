package com.uom.idecide.module.pojo;

import java.io.Serializable;

public class Option implements Serializable {
    private String content;
    private Integer rate;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    @Override
    public String toString() {
        return "Option{" +
                "content='" + content + '\'' +
                ", rate=" + rate +
                '}';
    }
}

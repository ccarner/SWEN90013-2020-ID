package com.uom.idecide.result.pojo;

import java.io.Serializable;

public class Option implements Serializable {
    private String content;
    private Integer rate;
    private Boolean selected;

    @Override
    public String toString() {
        return "Option{" +
                "content='" + content + '\'' +
                ", rate=" + rate +
                ", selected=" + selected +
                '}';
    }

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

    public Boolean getSelected() {
        return selected;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }
}

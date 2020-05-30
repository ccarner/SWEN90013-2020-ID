package com.uom.idecide.module.pojo;

import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Question implements Serializable {

    @Id
    private String questionId;
    private Integer type;
    private String description1;
    private String description2;
    private String content;
    private String img1Path;
    private String img2Path;
    private Date createDate;
    private Boolean active;
    private List<Option> Options;

    @Override
    public String toString() {
        return "Question{" +
                "questionId='" + questionId + '\'' +
                ", type=" + type +
                ", description1='" + description1 + '\'' +
                ", description2='" + description2 + '\'' +
                ", content='" + content + '\'' +
                ", img1Path='" + img1Path + '\'' +
                ", img2Path='" + img2Path + '\'' +
                ", createDate=" + createDate +
                ", active=" + active +
                ", Options=" + Options +
                '}';
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Option> getOptions() {
        return Options;
    }

    public void setOptions(List<Option> options) {
        Options = options;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getDescription1() {
        return description1;
    }

    public void setDescription1(String description1) {
        this.description1 = description1;
    }

    public String getDescription2() {
        return description2;
    }

    public void setDescription2(String description2) {
        this.description2 = description2;
    }

    public String getImg1Path() {
        return img1Path;
    }

    public void setImg1Path(String img1Path) {
        this.img1Path = img1Path;
    }

    public String getImg2Path() {
        return img2Path;
    }

    public void setImg2Path(String img2Path) {
        this.img2Path = img2Path;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}

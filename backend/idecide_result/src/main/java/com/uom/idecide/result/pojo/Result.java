package com.uom.idecide.result.pojo;

import java.io.Serializable;
import java.util.List;

public class Result implements Serializable {

    private String questionId;
    private String content;
    private List<Option> options;

    @Override
    public String toString() {
        return "Result{" +
                "questionId='" + questionId + '\'' +
                ", content='" + content + '\'' +
                ", options=" + options +
                '}';
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }

    public List<Option> getOptions() {
        return options;
    }
}

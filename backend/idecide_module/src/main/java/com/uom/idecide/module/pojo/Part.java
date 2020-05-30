package com.uom.idecide.module.pojo;

import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.List;

public class Part implements Serializable {

    @Id
    private String partId;
    private String moduleId;
    private String partName;
    private String description;
    private boolean active;
    private List<Question> questions;

    @Override
    public String toString() {
        return "Part{" +
                "partId='" + partId + '\'' +
                ", moduleId='" + moduleId + '\'' +
                ", partName='" + partName + '\'' +
                ", description='" + description + '\'' +
                ", active=" + active +
                ", questions=" + questions +
                '}';
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getPartId() {
        return partId;
    }

    public void setPartId(String partId) {
        this.partId = partId;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getPartName() {
        return partName;
    }

    public void setPartName(String partName) {
        this.partName = partName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

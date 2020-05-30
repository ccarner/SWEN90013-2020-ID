package com.uom.idecide.module.pojo;

import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.List;

public class Module implements Serializable {

    @Id
    private String moduleId;
    private String moduleName;
    private String description;
    private Boolean active;
    private List<Part> parts;

    @Override
    public String toString() {
        return "Module{" +
                "moduleId='" + moduleId + '\'' +
                ", moduleName='" + moduleName + '\'' +
                ", description='" + description + '\'' +
                ", active=" + active +
                ", parts=" + parts +
                '}';
    }

    public List<Part> getParts() {
        return parts;
    }

    public void setParts(List<Part> parts) {
        this.parts = parts;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}

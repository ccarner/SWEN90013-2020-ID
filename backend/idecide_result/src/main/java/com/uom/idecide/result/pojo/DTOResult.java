package com.uom.idecide.result.pojo;

import java.io.Serializable;
import java.util.List;

public class DTOResult implements Serializable {

    private String moduleId;
    private String partId;
    private String userId;
    private List<Result> results;

    @Override
    public String toString() {
        return "DTOResult{" +
                "results=" + results +
                ", moduleId='" + moduleId + '\'' +
                ", partId='" + partId + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }

    public List<Result> getResults() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getPartId() {
        return partId;
    }

    public void setPartId(String partId) {
        this.partId = partId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}

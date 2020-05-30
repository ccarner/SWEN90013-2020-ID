package entity;

import java.util.List;

public class PageResult <T> {

    //当前页码
    private long currentPage;
    //总共的记录数
    private long totalElements;
    //总共的页数
    private long totalPages;
    //具体内容
    private List<T> rows;

    public PageResult() {
    }

    public PageResult(long currentPage, long totalElements, long totalPages, List<T> rows) {
        this.currentPage = currentPage;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.rows = rows;
    }

    public long getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(long currentPage) {
        this.currentPage = currentPage;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public long getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(long totalPages) {
        this.totalPages = totalPages;
    }

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }
}

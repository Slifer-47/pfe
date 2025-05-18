package pfe.recouvrement.action;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pfe.recouvrement.action.dtoCounting;
import pfe.recouvrement.action.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public dtoCounting getDashboardStats() {
        return dashboardService.getDashboardStats();
    }
}

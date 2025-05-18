package pfe.recouvrement.action;

import org.springframework.stereotype.Service;

@Service
public class DashboardService {
    private final ActionRepository actionRepository;

    private static final int PLANNED_STATE = 40;
    private static final int IN_PROGRESS_STATE = 10;
    private static final int COMPLETED_STATE = 20;

    public DashboardService(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    public dtoCounting getDashboardStats() {
        dtoCounting stats = new dtoCounting();
        stats.setPlannedActions(actionRepository.countByState(PLANNED_STATE));
        stats.setInProgressActions(actionRepository.countByState(IN_PROGRESS_STATE));
        stats.setCompletedActions(actionRepository.countByState(COMPLETED_STATE));
        stats.setTargetedClients(actionRepository.countDistinctClients());
        return stats;
    }
}
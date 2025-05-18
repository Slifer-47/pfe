package pfe.recouvrement.action;

public class dtoCounting {
    private long plannedAct;
    private long inProgressAct;
    private long  completedAct;
    private long  targetedClients;

    public long getPlannedActions() { return plannedAct; }
    public void setPlannedActions(long plannedActions) { this.plannedAct = plannedActions; }

    public long getInProgressActions() { return inProgressAct; }
    public void setInProgressActions(long inProgressActions) { this.inProgressAct= inProgressActions; }

    public long getCompletedActions() { return completedAct; }
    public void setCompletedActions(long completedActions) { this.completedAct = completedActions; }

    public long getTargetedClients() { return targetedClients; }
    public void setTargetedClients(long targetedClients) { this.targetedClients = targetedClients; }



}

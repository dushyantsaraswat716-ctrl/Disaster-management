import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const StudentProgressTable = ({ students = [], onStudentSelect, onBulkAction }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(students?.map(student => student?.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents?.filter(id => id !== studentId));
    }
  };

  const sortedStudents = [...students]?.sort((a, b) => {
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (sortConfig?.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const getStatusColor = (status) => {
    const colors = {
      'excellent': 'text-success bg-success/10',
      'good': 'text-primary bg-primary/10',
      'fair': 'text-warning bg-warning/10',
      'needs-improvement': 'text-error bg-error/10'
    };
    return colors?.[status] || colors?.['fair'];
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Student Progress</h3>
          {selectedStudents?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedStudents?.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('assign-module', selectedStudents)}
                iconName="BookOpen"
                iconPosition="left"
              >
                Assign Module
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('schedule-drill', selectedStudents)}
                iconName="Play"
                iconPosition="left"
              >
                Schedule Drill
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedStudents?.length === students?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 font-medium text-foreground hover:text-primary"
                >
                  <span>Student</span>
                  <Icon name={getSortIcon('name')} size={16} />
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort('completedModules')}
                  className="flex items-center space-x-1 font-medium text-foreground hover:text-primary"
                >
                  <span>Modules</span>
                  <Icon name={getSortIcon('completedModules')} size={16} />
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort('drillsCompleted')}
                  className="flex items-center space-x-1 font-medium text-foreground hover:text-primary"
                >
                  <span>Drills</span>
                  <Icon name={getSortIcon('drillsCompleted')} size={16} />
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort('readinessScore')}
                  className="flex items-center space-x-1 font-medium text-foreground hover:text-primary"
                >
                  <span>Readiness</span>
                  <Icon name={getSortIcon('readinessScore')} size={16} />
                </button>
              </th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents?.map((student) => (
              <tr key={student?.id} className="border-b border-border hover:bg-muted/30">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedStudents?.includes(student?.id)}
                    onChange={(e) => handleSelectStudent(student?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{student?.name}</p>
                      <p className="text-sm text-muted-foreground">Class {student?.class}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <span className="text-sm font-medium">
                      {student?.completedModules}/{student?.totalModules}
                    </span>
                    <ProgressIndicator
                      progress={student?.completedModules}
                      total={student?.totalModules}
                      size="sm"
                      showPercentage={false}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <span className="text-sm font-medium">
                      {student?.drillsCompleted}/{student?.totalDrills}
                    </span>
                    <ProgressIndicator
                      progress={student?.drillsCompleted}
                      total={student?.totalDrills}
                      size="sm"
                      variant="primary"
                      showPercentage={false}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <span className="text-sm font-medium">{student?.readinessScore}%</span>
                    <ProgressIndicator
                      progress={student?.readinessScore}
                      total={100}
                      size="sm"
                      variant={student?.readinessScore >= 75 ? 'success' : student?.readinessScore >= 50 ? 'warning' : 'error'}
                      showPercentage={false}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student?.status)}`}>
                    {student?.status?.replace('-', ' ')}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onStudentSelect(student)}
                      iconName="Eye"
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onBulkAction('message', [student?.id])}
                      iconName="MessageCircle"
                      iconSize={16}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentProgressTable;
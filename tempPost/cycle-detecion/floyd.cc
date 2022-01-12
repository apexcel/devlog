#include <iostream>
#include <string>

using namespace std;

struct ListNode
{
    string val;
    ListNode* next;
};


class List {
    public:
        ListNode* head;

        void push(string val) {
            ListNode* node = new ListNode();
            node->val = val;
            node->next = nullptr;

            if (head == nullptr) {
                head = node;
            }
            else {
                ListNode* t = head;
                while (t->next != nullptr) {
                    t = t->next;
                }
                t->next = node;
            }
        }

        bool isCyclic(ListNode* head) {
            ListNode* slower = head;
            ListNode* faster = head;
            bool flag = false;

            while (slower && faster && faster->next) {
                slower = slower->next;
                faster = faster->next->next;
                if (slower == faster) {
                    flag = true;
                    break;
                }
            }
            return flag;
        }
};

int main() {
    List* list = new List();
    list->push("e0");
    list->push("e1");
    list->push("e2");
    list->push("e3");
    list->push("e4");
    list->push("e5");
    list->head->next->next->next->next->next->next = list->head->next->next;

    cout << list->isCyclic(list->head);

    return 0;
}